# 远程代理到客户端的更新

**简述:** A2A允许代理使用推送通知在连接中断时通知客户端。

<!-- TOC -->

- [远程代理到客户端的更新](#远程代理到客户端的更新)
  - [基本流程](#基本流程)
  - [推送通知配置](#推送通知配置)
  - [配置和规则](#配置和规则)
  - [验证、授权和凭证材料](#验证授权和凭证材料)
  - [JSON-RPC 事件细节](#json-rpc-事件细节)

<!-- /TOC -->

## 基本流程

远程代理被设计成异步长时间运行的服务。客户端可能会连接到代理，开始一个任务，然后断开连接。由于这个原因，代理需要有一种方式来在不再与客户端直接互动的情况下通知客户端更新。A2A提供了一种方式，代理（包括远程代理）可以通过推送通知机制向客户端通知更新。

推送通知允许代理通知客户端任务的状态变更，而无需客户端维护与代理的持续连接。通知类似于客户端订阅流式响应，但在客户端断开连接并由第三方服务代表客户端接收更新的情况下工作。此功能在移动设备和网络浏览器中特别有用，因为这些环境可能由于各种原因而断开连接，如切换到飞行模式、进入睡眠、失去网络连接或切换网络接口。

基本流程如下：

1. 客户端向代理发送包含`pushNotificationConfig`参数的请求，其中包含远程代理可以向其发送更新的端点。
2. 代理完成处理并向`pushNotificationConfig`参数中指定的URL发送更新。
3. 推送通知服务接收并验证更新并通知客户端。

以下是简化流程图，说明涉及的各个组件：

![A2A推送通知流程图](../images/a2a_push_notifications.png)

## 推送通知配置

要使用推送通知，客户端必须提供`pushNotificationConfig`参数。该参数包含代理应向其发送任务更新的推送通知服务的URL。

```typescript
interface PushNotificationConfig {
    // 推送通知服务的URL
    url: string;
    // 此任务/会话唯一的令牌，服务可用来
    // 验证接收到的更新的有效性
    token?: string;
    // 认证信息，包括代理认证所需的
    // 认证方案和可选凭证
    authentication?: {
        schemes: string[]; // 例如 ["bearer", "digest"]
        credentials?: string; // 例如 "eyAiYmxhaCIgOiAiYmxhaCIgfQo="
    };
}

// 在任务发送和重发时使用
interface TaskSendParams {
  // ...其他任务参数
  pushNotification?: PushNotificationConfig;
}
```

## 配置和规则

客户端可以配置任务的推送通知设置，如下方法所示：

```
tasks/pushNotification/set
tasks/pushNotification/get
```

- **tasks/pushNotification/set** 允许客户端配置推送通知，包括客户端希望接收通知的推送通知服务的URL，以及代理访问该服务所需的任何凭证。
- **tasks/pushNotification/get** 允许客户端检索当前的推送通知配置。

**示例：设置推送通知**

```json
//请求
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
//响应
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

**示例：获取推送通知**

```json
//请求
{
  "jsonrpc": "2.0",
  "id": 1,
  "method":"tasks/pushNotification/get",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64"
  }
}
//响应
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

## 验证、授权和凭证材料

为了安全起见，代理必须对推送通知服务进行身份验证，并且推送通知服务必须对代理进行身份验证。通过这种方式，客户端可以确保更新确实来自代表其执行任务的代理。代理也可以确保它正在向正确的推送通知服务发送更新。

客户端将信任的推送通知服务的URL提供给代理。代理采用OpenAPI支持的标准身份验证方法对该服务进行身份验证，如Bearer令牌或OAuth2。代理卡片应公布它支持的用于推送通知的身份验证方法，并且客户端必须提供必要的凭证材料。

推送通知服务可以接收来自多个代理的更新，每个代理有唯一的认证和客户端。服务必须仅接受来自已注册为特定客户端任务处理的代理的更新。它通过客户端向代理提供的授权令牌确认代理和客户端之间的链接。这确保了代理只向已向特定推送通知服务注册的客户端发送更新。

## JSON-RPC 事件细节

当代理需要通知客户端任务状态变更时，它向客户端的推送通知服务以JSON-RPC格式发送请求：

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

当代理需要推送成果更新时，它向客户端的推送通知服务以JSON-RPC格式发送以下请求：

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
            "text": "我已经为您订购了一部新的Android设备。您的请求编号是R12443"
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

推送通知服务收到这些更新后，会通过其自身的机制通知客户端。推送通知服务可以通过多种方法通知客户端，这取决于客户端的性质和连接状态：

- 对于移动设备，通知服务可以使用设备原生的推送通知系统，如Firebase Cloud Messaging (FCM)、Apple Push Notification Service (APNS)。
- 对于Web应用程序，服务可以使用Web Push API或WebSockets。
- 对于其他类型的客户端，服务可以使用各种方法，如Webhook回调或通过消息队列。

推送通知服务负责验证代理的身份，确保更新确实来自负责处理任务的代理。服务然后使用客户端提供的令牌验证代理与该特定客户端的关联。这双重验证过程确保了推送通知系统的安全，防止恶意代理向不属于它们的客户端发送更新。 