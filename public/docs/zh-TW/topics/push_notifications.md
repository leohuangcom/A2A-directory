# 遠程代理到客戶端的更新

**簡述:** A2A允許代理使用推送通知在連接中斷時通知客戶端。

<!-- TOC -->

- [遠程代理到客戶端的更新](#遠程代理到客戶端的更新)
  - [基本流程](#基本流程)
  - [推送通知配置](#推送通知配置)
  - [配置和規則](#配置和規則)
  - [驗證、授權和憑證材料](#驗證授權和憑證材料)
  - [JSON-RPC 事件細節](#json-rpc-事件細節)

<!-- /TOC -->

## 基本流程

遠程代理被設計成異步長時間運行的服務。客戶端可能會連接到代理，開始一個任務，然後斷開連接。由於這個原因，代理需要有一種方式來在不再與客戶端直接互動的情況下通知客戶端更新。A2A提供了一種方式，代理（包括遠程代理）可以通過推送通知機制向客戶端通知更新。

推送通知允許代理通知客戶端任務的狀態變更，而無需客戶端維護與代理的持續連接。通知類似於客戶端訂閱流式響應，但在客戶端斷開連接並由第三方服務代表客戶端接收更新的情況下工作。此功能在移動設備和網絡瀏覽器中特別有用，因為這些環境可能由於各種原因而斷開連接，如切換到飛行模式、進入睡眠、失去網絡連接或切換網絡接口。

基本流程如下：

1. 客戶端向代理發送包含`pushNotificationConfig`參數的請求，其中包含遠程代理可以向其發送更新的端點。
2. 代理完成處理並向`pushNotificationConfig`參數中指定的URL發送更新。
3. 推送通知服務接收並驗證更新並通知客戶端。

以下是簡化流程圖，說明涉及的各個組件：

![A2A推送通知流程圖](/docs/images/a2a_push_notifications.png)

## 推送通知配置

要使用推送通知，客戶端必須提供`pushNotificationConfig`參數。該參數包含代理應向其發送任務更新的推送通知服務的URL。

```typescript
interface PushNotificationConfig {
    // 推送通知服務的URL
    url: string;
    // 此任務/會話唯一的令牌，服務可用來
    // 驗證接收到的更新的有效性
    token?: string;
    // 認證信息，包括代理認證所需的
    // 認證方案和可選憑證
    authentication?: {
        schemes: string[]; // 例如 ["bearer", "digest"]
        credentials?: string; // 例如 "eyAiYmxhaCIgOiAiYmxhaCIgfQo="
    };
}

// 在任務發送和重發時使用
interface TaskSendParams {
  // ...其他任務參數
  pushNotification?: PushNotificationConfig;
}
```

## 配置和規則

客戶端可以配置任務的推送通知設置，如下方法所示：

```
tasks/pushNotification/set
tasks/pushNotification/get
```

- **tasks/pushNotification/set** 允許客戶端配置推送通知，包括客戶端希望接收通知的推送通知服務的URL，以及代理訪問該服務所需的任何憑證。
- **tasks/pushNotification/get** 允許客戶端檢索當前的推送通知配置。

**示例：設置推送通知**

```json
//請求
{
  "jsonrpc": "2.0",
  "id": 1,
  "method":"tasks/pushNotification/set",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "pushNotificationConfig": {
      "url": "https://example.com/callback",
      "authentication": {
        "schemes": ["jwt"]
      }
    }
  }
}
//響應
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "pushNotificationConfig": {
      "url": "https://example.com/callback",
      "authentication": {
        "schemes": ["jwt"]
      }
    }
  }
}
```

**示例：獲取推送通知**

```json
//請求
{
  "jsonrpc": "2.0",
  "id": 1,
  "method":"tasks/pushNotification/get",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64"
  }
}
//響應
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "pushNotificationConfig": {
      "url": "https://example.com/callback",
      "authentication": {
        "schemes": ["jwt"]
      }
    }
  }
}
```

## 驗證、授權和憑證材料

為了安全起見，代理必須對推送通知服務進行身份驗證，並且推送通知服務必須對代理進行身份驗證。通過這種方式，客戶端可以確保更新確實來自代表其執行任務的代理。代理也可以確保它正在向正確的推送通知服務發送更新。

客戶端將信任的推送通知服務的URL提供給代理。代理採用OpenAPI支持的標準身份驗證方法對該服務進行身份驗證，如Bearer令牌或OAuth2。代理卡片應公布它支持的用於推送通知的身份驗證方法，並且客戶端必須提供必要的憑證材料。

推送通知服務可以接收來自多個代理的更新，每個代理有唯一的認證和客戶端。服務必須僅接受來自已註冊為特定客戶端任務處理的代理的更新。它通過客戶端向代理提供的授權令牌確認代理和客戶端之間的鏈接。這確保了代理只向已向特定推送通知服務註冊的客戶端發送更新。

## JSON-RPC 事件細節

當代理需要通知客戶端任務狀態變更時，它向客戶端的推送通知服務以JSON-RPC格式發送請求：

```json
{
  "jsonrpc": "2.0",
  "method": "tasks/event",
  "params": {
    "event": {
      "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
      "type": "status",
      "status": {
         "state": "completed",
         "timestamp": "2023-05-18T20:48:53.000Z"
       },
       "final": true
    },
    "token": "client-token"
  }
}
```

當代理需要推送成果更新時，它向客戶端的推送通知服務以JSON-RPC格式發送以下請求：

```json
{
  "jsonrpc": "2.0",
  "method": "tasks/event",
  "params": {
    "event": {
      "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
      "type": "artifact",
      "artifact": {
        "name": "summary",
        "parts": [
          {
            "type": "text",
            "text": "我已經為您訂購了一部新的Android設備。您的請求編號是R12443"
          }
        ],
        "index": 0,
        "append": false,
        "lastChunk": true
      }
    },
    "token": "client-token"
  }
}
```

推送通知服務收到這些更新後，會通過其自身的機制通知客戶端。推送通知服務可以通過多種方法通知客戶端，這取決於客戶端的性質和連接狀態：

- 對於移動設備，通知服務可以使用設備原生的推送通知系統，如Firebase Cloud Messaging (FCM)、Apple Push Notification Service (APNS)。
- 對於Web應用程序，服務可以使用Web Push API或WebSockets。
- 對於其他類型的客戶端，服務可以使用各種方法，如Webhook回調或通過消息隊列。

推送通知服務負責驗證代理的身份，確保更新確實來自負責處理任務的代理。服務然後使用客戶端提供的令牌驗證代理與該特定客戶端的關聯。這雙重驗證過程確保了推送通知系統的安全，防止惡意代理向不屬於它們的客戶端發送更新。 