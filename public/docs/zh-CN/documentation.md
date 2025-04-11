# Agent2Agent 协议 (A2A)

Agent2Agent (A2A) 是一个开放协议，旨在实现代理间的互操作性，弥合**不透明**代理系统之间的差距。
<img src="/docs/images/a2a_actors.png" width="70%" style="margin:20px auto;display:block;">

<!-- TOC -->

- [Agent2Agent 协议 (A2A)](#agent2agent-协议-a2a)
  - [反馈和变更](#反馈和变更)
  - [关键原则](#关键原则)
  - [更多详细讨论](#更多详细讨论)
  - [概述](#概述)
    - [参与者](#参与者)
    - [传输](#传输)
    - [身份验证和授权](#身份验证和授权)
  - [代理卡片](#代理卡片)
    - [发现](#发现)
    - [表示](#表示)
  - [代理间通信](#代理间通信)
  - [核心对象](#核心对象)
    - [任务](#任务)
    - [成果](#成果)
    - [消息](#消息)
    - [部分](#部分)
    - [推送通知](#推送通知)
- [示例方法和JSON响应](#示例方法和json响应)
  - [代理卡片](#代理卡片-1)
  - [发送任务](#发送任务)
  - [获取任务](#获取任务)
  - [取消任务](#取消任务)
  - [设置任务推送通知](#设置任务推送通知)
  - [获取任务推送通知](#获取任务推送通知)
  - [多轮对话](#多轮对话)
  - [流式支持](#流式支持)
    - [重新订阅任务](#重新订阅任务)
  - [非文本媒体](#非文本媒体)
  - [结构化输出](#结构化输出)
  - [错误处理](#错误处理)

<!-- /TOC -->

## 反馈和变更

A2A 仍在开发中，预计会根据社区反馈进行更改。此存储库包含初始规范、文档和[示例代码](https://github.com/google/A2A/tree/main/samples)。我们将继续更新此存储库，添加更多功能、示例、规范和库。当规范和示例能够升级为生产质量SDK时，我们将宣布1.0版本并维护稳定发布。

## 关键原则

使用A2A，代理可以为终端用户完成任务，而无需共享记忆、思想或工具。相反，代理交换上下文、状态、指令和他们原生模态中的数据。

- **简单**：重用现有标准
- **企业就绪**：认证、安全、隐私、跟踪、监控
- **异步优先**：（非常）长时间运行的任务和人机交互
- **模态无关**：文本、音频/视频、表单、iframe等
- **不透明执行**：代理不必共享思想、计划或工具

### 更多详细讨论

- [A2A和MCP](topics/a2a_and_mcp.md?id=a2a-❤%ef%b8%8f-mcp)
- [企业就绪](topics/enterprise_ready.md?id=enterprise-readiness)
- [推送通知](topics/push_notifications.md?id=remote-agent-to-client-updates)
- [代理发现](topics/agent_discovery.md?id=discovering-agent-cards)

## 概述

### 参与者

A2A协议有三个参与者：

- **用户**  
  使用代理系统完成任务的终端用户（人或服务）。
- **客户端**  
  代表用户向不透明代理请求操作的实体（服务、代理、应用程序）。
- **远程代理（服务器）**  
  不透明（"黑盒"）代理，即A2A服务器。

### 传输

该协议利用HTTP作为客户端和远程代理之间的传输方式。根据客户端和远程代理的能力，它们可能会利用SSE来支持流式接收来自服务器的更新。

A2A利用[JSON-RPC 2.0](https://www.jsonrpc.org/specification)作为客户端和远程代理之间通信的数据交换格式。

### 异步

A2A客户端和服务器可以使用标准的请求/响应模式并轮询更新。然而，A2A还支持通过SSE（在连接时）进行流式更新，以及在断开连接时接收[推送通知](/topics/push_notifications.md?id=remote-agent-to-client-updates)。

### 身份验证和授权

A2A将智能体建模为企业应用程序（这是可行的，因为A2A智能体是不透明的，不共享工具和资源）。这使得智能体间互操作性迅速具备企业级就绪性。

A2A遵循[Open API的身份验证规范](https://swagger.io/docs/specification/v3_0/authentication/)进行身份验证。重要的是，A2A智能体不在A2A协议内交换身份信息。相反，它们在带外获取材料（如令牌），并在HTTP头中而非A2A负载中传输这些材料。

虽然A2A不在带内传输身份，但服务器会在A2A负载中发送身份验证要求。至少，服务器需要在其[智能体卡片](#agent-card)中公布其要求。关于发现智能体卡片的思考在[此主题](topics/agent_discovery.md?id=discovering-agent-cards)中。

客户端应使用服务器公布的身份验证协议之一来验证其身份并获取凭证材料。A2A服务器应对**每个**请求进行身份验证，并使用标准HTTP响应代码（401, 403）以及特定于身份验证协议的头和主体（如HTTP 401响应，带有指示所需身份验证模式的[WWW-Authenticate](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate)头，或在已知路径上的OIDC发现文档）拒绝或质疑请求。更多详情在[企业就绪](topics/enterprise_ready.md)中讨论。

> 注意：如果智能体需要客户端/用户在任务执行期间提供额外凭证（例如，使用特定工具），智能体应返回任务状态为`Input-Required`，有效载荷为身份验证结构。客户端应再次在A2A带外获取凭证材料。

## 代理卡片

支持A2A的远程代理需要以JSON格式发布**代理卡片**，描述代理的能力/技能和身份验证机制。客户端使用代理卡片信息来识别能够执行任务的最佳代理，并利用A2A与该远程代理通信。

### 发现

我们建议在 https://`基础 URL`/.well-known/agent.json 托管代理卡片。这与DNS方法兼容，客户端通过DNS找到服务器IP并发送HTTP GET请求来检索代理卡片。我们还预期系统将维护私有注册表（例如"代理目录"或私有市场等）。更多讨论可在[此文档](topics/agent_discovery.md?id=discovering-agent-cards)中找到。

### 表示

以下是代理卡片的建议表示

```typescript
// 代理卡片传达关键信息：
// - 总体详情（版本、名称、描述、用途）
// - 技能：代理可以执行的一组能力
// - 代理支持的默认模态/内容类型
// - 身份验证要求
interface AgentCard {
  // 代理的人类可读名称
  // (例如 "食谱代理")
  name: string;
  // 代理的人类可读描述。用于帮助用户和
  // 其他代理理解该代理能做什么。
  // (例如 "帮助用户处理食谱和烹饪的代理。")
  description: string;
  // 代理托管地址的URL
  url: string;
  // 代理的服务提供商
  provider?: {
    organization: string;
    url: string;
  };
  // 代理的版本 - 格式由提供商决定（例如 "1.0.0"）
  version: string;
  // 指向代理文档的URL
  documentationUrl?: string;
  // 代理支持的可选功能
  capabilities: {
    streaming?: boolean; // 如果代理支持SSE则为true
    pushNotifications?: boolean; // 如果代理可以向客户端通知更新则为true
    stateTransitionHistory?: boolean; //如果代理公开任务的状态变更历史则为true
  };
  // 代理的身份验证要求
  // 旨在匹配OpenAPI身份验证结构
  authentication: {
    schemes: string[]; // 例如 Basic, Bearer
    credentials?: string; //客户端应用于私有卡片的凭证
  };
  // 代理在所有技能中支持的交互模式集
  // 这可以在每个技能中被覆盖
  defaultInputModes: string[]; // 支持的输入MIME类型
  defaultOutputModes: string[]; // 支持的输出MIME类型
  // 技能是代理可以执行的能力单元
  skills: {
    id: string; // 代理技能的唯一标识符
    name: string; //技能的人类可读名称
    // 技能的描述 - 将被客户端或人类用作
    // 理解该技能作用的提示
    description: string;
    // 描述此特定技能能力类别的标签词集
    // (例如 "烹饪", "客户支持", "计费")
    tags: string[];
    // 技能可以执行的示例场景集
    // 将被客户端用作理解如何使用该技能的提示
    // (例如 "我需要面包的食谱")
    examples?: string[]; // 任务提示示例
    // 技能支持的交互模式集
    // (如果与默认值不同)
    inputModes?: string[]; // 支持的输入MIME类型
    outputModes?: string[]; // 支持的输出MIME类型
  }[];
}
```

## 代理间通信

客户端与远程代理之间的通信面向**_任务完成_**，代理协作满足终端用户的请求。任务对象允许客户端和远程代理协作完成提交的任务。

任务可以由远程代理立即完成，也可以是长时间运行的。对于长时间运行的任务，客户端可能会轮询代理以获取最新状态。代理还可以通过SSE（如果已连接）或通过外部通知服务向客户端推送通知。

## Core Objects

### Task

任务是一个有状态的实体，允许客户端和远程代理实现特定的结果并生成结果。客户端和远程代理在任务内交换消息。远程代理生成结果作为成果。

任务始终由客户端创建，状态始终由远程代理确定。如果客户端需要，多个任务可能是共同会话的一部分（由可选的sessionId表示）。为此，客户端在创建任务时设置可选的sessionId。

代理可能：

- 立即满足请求
- 安排以后的工作
- 拒绝请求
- 协商不同的模态
- 要求客户端提供更多信息
- 委托给其他代理和系统

即使在满足目标后，客户端仍可以请求更多信息或在同一任务的上下文中进行更改。（例如，客户端："画一张兔子的图片"，代理："<图片>"，客户端："把它变成红色"）。

任务用于传输[成果](#artifact)（结果）和[消息](#message)（想法、指令、其他任何内容）。任务维护状态和可选的状态和消息历史记录。

```typescript
interface Task {
  id: string; // 任务的唯一标识符
  sessionId: string; // 客户端生成的会话ID，用于保存任务
  status: TaskStatus; // 任务的当前状态
  history?: Message[];
  artifacts?: Artifact[]; // 代理创建的成果集合
  metadata?: Record<string, any>; // 扩展元数据
}
// 任务状态和伴随的消息
interface TaskStatus {
  state: TaskState;
  message?: Message; //客户端的额外状态更新
  timestamp?: string; // ISO 日期时间值
}
// 在sendSubscribe或subscribe请求期间由服务器发送
interface TaskStatusUpdateEvent {
  id: string;
  status: TaskStatus;
  final: boolean; //表示事件流的结束
  metadata?: Record<string, any>;
}
// 在sendSubscribe或subscribe请求期间由服务器发送
interface TaskArtifactUpdateEvent {
  id: string;
  artifact: Artifact;
  metadata?: Record<string, any>;
}
// 由客户端发送给代理以创建、继续或重新启动任务
interface TaskSendParams {
  id: string;
  sessionId?: string; //如果未设置，服务器为新任务创建新sessionId
  message: Message;
  historyLength?: number; //要检索的最近消息数量
  // 断开连接时服务器应发送通知的位置
  pushNotification?: PushNotificationConfig;
  metadata?: Record<string, any>; // 扩展元数据
}
type TaskState =
  | "submitted" // 已提交
  | "working" // 工作中
  | "input-required" // 需要输入
  | "completed" // 已完成
  | "canceled" // 已取消
  | "failed" // 失败
  | "unknown"; // 未知
```

### Artifact

代理生成成果作为任务的最终结果。成果是不可变的，可以命名，并且可以有多个部分。流式响应可以向现有成果附加部分。

单个任务可以生成多个成果。例如，"创建网页"可以创建单独的HTML和图像成果。

```typescript
interface Artifact {
  name?: string; // 名称
  description?: string; // 描述
  parts: Part[]; // 部分
  metadata?: Record<string, any>; // 元数据
  index: number; // 索引
  append?: boolean; // 是否追加
  lastChunk?: boolean; // 是否为最后一块
}
```

### Message

消息包含任何不是成果的内容。这可以包括代理思考、用户上下文、指令、错误、状态或元数据等内容。

来自客户端的所有内容都以消息的形式出现。代理发送消息以传达状态或提供指令（而生成的结果作为成果发送）。

消息可以有多个部分来表示不同的内容片段。例如，用户请求可以包括来自用户的文本描述，然后是来自客户端用作上下文的多个文件。

```typescript
interface Message {
  role: "user" | "agent"; // 角色：用户或代理
  parts: Part[]; // 部分
  metadata?: Record<string, any>; // 元数据
}
```

### 部分

作为消息或成果的一部分，在客户端和远程代理之间交换的完整内容片段。每个部分都有自己的内容类型和元数据。

```typescript
interface TextPart {
  type: "text"; // 文本类型
  text: string; // 文本内容
}
interface FilePart {
  type: "file"; // 文件类型
  file: {
    name?: string; // 文件名
    mimeType?: string; // MIME类型
    // 二选一 {
    bytes?: string; //base64编码内容
    uri?: string; //URI
    //}
  };
}
interface DataPart {
  type: "data"; // 数据类型
  data: Record<string, any>; // 数据内容
}
type Part = (TextPart | FilePart | DataPart) & {
  metadata: Record<string, any>; // 元数据
};
```

### 推送通知

A2A支持一种安全的通知机制，代理可以通过PushNotificationService在连接会话之外通知客户端更新。在企业内部和跨企业，代理验证通知服务的身份、向服务进行自我身份验证并提供将通知与执行任务关联的标识符是至关重要的。

PushNotificationService的目标服务器应被视为一个独立的服务，并不保证（甚至不期望）直接是客户端。这个PushNotificationService负责对代理进行身份验证和授权，并将经过验证的通知代理到适当的端点（可以是从pub/sub队列到电子邮件收件箱或其他服务等任何东西）。

对于具有隔离的客户端-代理对（例如，在封闭VPC中的本地服务网格等）或没有企业安全问题的隔离环境，客户端可以选择简单地打开一个端口并作为自己的PushNotificationService。任何企业实现都可能有一个集中式服务，使用受信任的通知凭据对远程代理进行身份验证，并能处理在线/离线场景。（这应该类似于移动推送通知服务来考虑）。

```typescript
interface PushNotificationConfig {
  url: string; // URL
  token?: string; // 此任务/会话唯一的令牌
  authentication?: {
    schemes: string[]; // 认证方案
    credentials?: string; // 凭证
  };
}
interface TaskPushNotificationConfig {
  id: string; //任务ID
  pushNotificationConfig: PushNotificationConfig; //推送通知配置
}
```

# 示例方法和JSON响应

## 代理卡片

```json
//代理卡片
{
  "name": "Google Maps Agent",
  "description": "规划路线、记忆地点和生成方向",
  "url": "https://maps-agent.google.com",
  "provider": {
    "organization": "Google",
    "url": "https://google.com"
  },
  "version": "1.0.0",
  "authentication": {
    "schemes": "OAuth2"
  },
  "defaultInputModes": ["text/plain"],
  "defaultOutputModes": ["text/plain", "application/html"],
  "capabilities": {
    "streaming": true,
    "pushNotifications": false
  },
  "skills": [
    {
      "id": "route-planner",
      "name": "路线规划",
      "description": "帮助规划两个位置之间的路线",
      "tags": ["地图", "路线", "导航"],
      "examples": [
        "规划从Sunnyvale到Mountain View的路线",
        "从Sunnyvale到San Francisco在上午9点的通勤时间是多少",
        "创建从Sunnyvale到Mountain View的逐步指引"
      ],
      // 可以返回路线的视频
      "outputModes": ["application/html", "video/mp4"]
    },
    {
      "id": "custom-map",
      "name": "我的地图",
      "description": "管理带有您自己保存地点的自定义地图",
      "tags": ["自定义地图", "保存地点"],
      "examples": [
        "在地图上显示我最喜爱的餐厅",
        "创建过去一年我访问过的所有地点的可视化"
      ],
      "outputModes": ["application/html"]
    }
  ]
}
```

## 发送任务

允许客户端向远程代理发送内容以启动新任务、恢复中断的任务或重新打开已完成的任务。任务中断可能是由于代理需要额外的用户输入或运行时错误导致的。

```json
//请求
{
  "jsonrpc": "2.0",
  "id": 1,
  "method":"tasks/send",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "message": {
      "role":"user",
      "data": [{
        "type":"text",
        "text": "给我讲个笑话"
      }]
    },
    "metadata": {}
  }
}
//响应
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "sessionId": "c295ea44-7543-4f78-b524-7a38915ad6e4",
    "status": {
      "state": "completed",
    },
    "artifacts": [{
      "name":"joke",
      "parts": [{
          "type":"text",
          "text":"为什么鸡要过马路？为了到达另一边！"
        }]
      }],
    "metadata": {}
  }
}
```

## 获取任务

客户端可以使用此方法检索任务的生成成果。代理确定之前提交给它的任务的保留窗口。代理可能会为超过代理保留窗口的任务或短暂且未被代理持久化的任务返回错误代码。

客户端还可以请求任务的最后N个历史项目，这将按顺序包括客户端和服务器发送的所有消息。默认情况下，这是0（无历史记录）。

```json
//请求
{
  "jsonrpc": "2.0",
  "id": 1,
  "method":"tasks/get",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "historyLength": 10,
    "metadata": {}
  }
}
//响应
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "sessionId": "c295ea44-7543-4f78-b524-7a38915ad6e4",
    "status": {
      "state": "completed"
    },
    "artifacts": [{
      "parts": [{
        "type":"text",
        "text":"为什么鸡要过马路？为了到达另一边！"
      }]
    }],
    "history":[
      {
        "role": "user",
        "parts": [
          {
            "type": "text",
            "text": "给我讲个笑话"
          }
        ]
      }
    ],
    "metadata": {}
  }
}
```

## 取消任务

客户端可以选择取消之前提交的任务，如下所示。

```json
//请求
{
  "jsonrpc": "2.0",
  "id": 1,
  "method":"tasks/cancel",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "metadata": {}
  }
}
//响应
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": 1,
    "sessionId": "c295ea44-7543-4f78-b524-7a38915ad6e4",
    "status": {
      "state": "canceled"
    },
    "metadata": {}
  }
}
```

## 设置任务推送通知

客户端可以配置推送通知URL以接收任务状态变更的更新。

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

## 获取任务推送通知

客户端可以使用此方法检索任务当前配置的推送通知配置。

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

## 多轮对话

如果远程代理需要额外的用户输入，任务可能会暂停执行。当任务处于`input-required`状态时，客户端需要提供额外的输入，以便任务在远程代理上恢复处理。

`input-required`状态中包含的消息必须包括指示客户端必须执行的操作的详情。例如"填写表单"或"登录SaaS服务foo"。如果这包括结构化数据，应将指令作为一个`Part`发送，将结构化数据作为第二个`Part`发送。

```json
//请求 - 序列1
{
  "jsonrpc": "2.0",
  "id": 9,
  "method":"tasks/send",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "sessionId": "c295ea44-7543-4f78-b524-7a38915ad6e4",
    "message": {
      "role":"user",
      "parts": [{
        "type":"text",
        "text": "分析附加的报告并生成高级概览"
      },{
        "type":"file",
        "file": {
           "mimeType": "application/pdf",
           "data":"<base64编码内容>"
        }
      }]
    },
    "metadata": {}
  }
}
//响应 - 序列2
{
  "jsonrpc": "2.0",
  "id": 9,
  "result": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "sessionId": "c295ea44-7543-4f78-b524-7a38915ad6e4",
    "status": {
      "state": "working",
      "message": {
        "role": "agent",
        "parts": [{
          "type":"text",
          "text":"分析正在进行中，请稍候"
        }],
        "metadata": {}
       }
     },
    "metadata": {}
  }
}
//请求 - 序列3
{
  "jsonrpc": "2.0",
  "id": 10,
  "method":"tasks/get",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "metadata": {}
  }
}
//响应 - 序列4
{
  "jsonrpc": "2.0",
  "id": 9,
  "result": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "sessionId": "c295ea44-7543-4f78-b524-7a38915ad6e4",
    "status": {
      "state": "completed"
     },
    "artifacts": [{
      "parts": [{
        "type":"text",
        "text":"<生成的分析内容>"
       }],
       "metadata": {}
     }],
    "metadata": {}
  }
}
```

## 流式支持

对于能够通过带有SSE的HTTP通信的客户端和远程代理，客户端可以在创建新任务时使用方法`tasks/sendSubscribe`发送RPC请求。远程代理可以使用TaskStatusUpdateEvents流（用于传达状态变化或指令/请求）和TaskArtifactUpdateEvents流（用于流式传输生成的结果）进行响应。
注意，TaskArtifactUpdateEvents可以向现有成果附加新部分。客户端可以使用`task/get`在流之外检索整个成果。
代理必须在流结束时或如果代理被中断并需要额外用户输入时设置final: true属性。

```json
//请求
{
  "method":"tasks/sendSubscribe",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "sessionId": "c295ea44-7543-4f78-b524-7a38915ad6e4",
    "message": {
      "role":"user",
      "parts": [{
        "type":"text",
        "text": "写一篇描述附图的长文"
      },{
        "type":"file",
        "file": {
           "mimeType": "image/png",
           "data":"<base64编码内容>"
        }
      }]
    },
    "metadata": {}
  }
}

//响应
data: {
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": 1,
    "status": {
      "state": "working",
      "timestamp":"2025-04-02T16:59:25.331844"
    },
    "final": false
  }
}

data: {
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": 1,    
    "artifact": [
      "parts": [
        {"type":"text", "text": "<第1部分...>"}
      ],
      "index": 0,
      "append": false,      
      "lastChunk": false
    ]
  }
}
data: {
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": 1,  
    "artifact": [
      "parts": [
        {"type":"text", "text": "<第2部分...>"}
      ],
      "index": 0,
      "append": true,      
      "lastChunk": false
    ]
  }
}
data: {
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": 1,    
    "artifact": [
      "parts": [
        {"type":"text", "text": "<第3部分...>"}
      ],
      "index": 0,
      "append": true,
      "lastChunk": true
    ]
  }
}

data: {
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": 1,
    "status": {
      "state": "completed",
      "timestamp":"2025-04-02T16:59:35.331844"
    },
    "final": true
  }
}
```

### 重新订阅任务

断开连接的客户端可以重新订阅支持流式传输的远程代理，以通过SSE接收任务更新。

```json
//请求
{
  "method":"tasks/resubscribe",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "metadata": {}
  }
}
//响应
data: {
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "artifact":[
      "parts": [
        {"type":"text", "text": "<第2部分...>"}
      ],
      "index": 0,
      "append": true,
      "lastChunk":false
    ]
  }
}
data: {
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "artifact":[
      "parts": [
        {"type":"text", "text": "<第3部分...>"}
      ],
      "index": 0,
      "append": true,
      "lastChunk": true
    ]   
  }
}

data: {
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "id": 1,
    "status": {
      "state": "completed",
      "timestamp":"2025-04-02T16:59:35.331844"
    },
    "final": true
  }
}
```

## 非文本媒体

以下是客户端与代理之间使用非文本数据的交互示例。

```json
//Request - seq 1
{
  "jsonrpc": "2.0",
  "id": 9,
  "method":"tasks/send",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "sessionId": "c295ea44-7543-4f78-b524-7a38915ad6e4",
    "message": {
      "role":"user",
      "parts": [{
        "type":"text",
        "text": "Analyze the attached report and generate high level overview"
      },{
        "type":"file",
        "file": {
           "mimeType": "application/pdf",
           "data":"<base64编码内容>"
        }
      }]
    },
    "metadata": {}
  }
}
//Response - seq 2
{
  "jsonrpc": "2.0",
  "id": 9,
  "result": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "sessionId": "c295ea44-7543-4f78-b524-7a38915ad6e4",
    "status": {
      "state": "working",
      "message": {
        "role": "agent",
        "parts": [{
          "type":"text",
          "text":"analysis in progress, please wait"
        }],
        "metadata": {}
       }
     },
    "metadata": {}
  }
}
//Request - seq 3
{
  "jsonrpc": "2.0",
  "id": 10,
  "method":"tasks/get",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "metadata": {}
  }
}
//Response - seq 4
{
  "jsonrpc": "2.0",
  "id": 9,
  "result": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "sessionId": "c295ea44-7543-4f78-b524-7a38915ad6e4",
    "status": {
      "state": "completed"
     },
    "artifacts": [{
      "parts": [{
        "type":"text",
        "text":"<generated analysis content>"
       }],
       "metadata": {}
     }],
    "metadata": {}
  }
}
```

## 结构化输出

客户端或代理都可以请求对方提供结构化输出。

```json
//请求
{
  "jsonrpc": "2.0",
  "id": 9,
  "method":"tasks/send",
  "params": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "sessionId": "c295ea44-7543-4f78-b524-7a38915ad6e4",
    "message": {
      "role":"user",
      "parts": [{
        "type":"text",
        "text": "显示我的未解决IT工单列表",
        "metadata": {
          "mimeType": "application/json",
          "schema": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "ticketNumber": { "type": "string" },
                "description": { "type": "string" }
              }
            }
          }
        }
      }]
    },
    "metadata": {}
  }
}
//响应
{
  "jsonrpc": "2.0",
  "id": 9,
  "result": {
    "id": "de38c76d-d54c-436c-8b9f-4c2703648d64",
    "sessionId": "c295ea44-7543-4f78-b524-7a38915ad6e4",
    "status": {
      "state": "working",
      "message": {
        "role": "agent",
        "parts": [{
            "type":"text",
            "text":"[{\"ticketNumber\":\"REQ12312\",\"description\":\"请求VPN访问权限\"},{\"ticketNumber\":\"REQ23422\",\"description\":\"添加到团队邮件列表 - team-gcp-onboarding\"}]"
        }],
        "metadata": {}
      }
    },
    "metadata": {}
  }
}
```

## 错误处理

以下是服务器在处理客户端请求时遇到错误时用于响应客户端的ErrorMessage格式。

```typescript
interface ErrorMessage {
  code: number;
  message: string;
  data?: any;
}
```

以下是服务器可以用于错误场景的标准JSON-RPC错误代码：

| 错误代码            | 消息           | 描述                                         |
| :----------------- | :------------- | :------------------------------------------- |
| \-32700            | JSON解析错误    | 发送了无效的JSON                             |
| \-32600            | 无效请求        | 请求有效载荷验证错误                         |
| \-32601            | 方法不存在      | 不是有效的方法                               |
| \-32602            | 无效参数        | 无效的方法参数                               |
| \-32603            | 内部错误        | 内部JSON-RPC错误                             |
| \-32000 至 \-32099 | 服务器错误      | 保留用于实现特定的错误代码                    |
| \-32001            | 任务未找到      | 未找到具有提供ID的任务                        |
| \-32002            | 任务无法取消    | 任务无法被远程代理取消                        |
| \-32003            | 不支持推送通知  | 代理不支持推送通知                            |
| \-32004            | 不支持的操作    | 不支持该操作                                 |
| \-32005            | 内容类型不兼容  | 客户端和代理之间的内容类型不兼容              |