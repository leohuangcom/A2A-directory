# Agent2Agent 协议 (A2A)

一种开放协议，实现Agent-to-Agent互操作性，连接**不透明**的智能体系统。

![A2A 参与者](../images/a2a_actors.png)

## 反馈和变更

A2A 是一个正在进行中的工作，预计会根据社区反馈进行变更。此存储库包含初始规范、文档和[示例代码](https://github.com/google/A2A/tree/main/samples)。我们将继续用更多功能、示例、规范和库更新此存储库。当规范和示例可以升级为生产质量SDK时，我们将声明版本1.0并维护稳定版本。

## 核心原则

使用A2A，智能体无需共享记忆、思想或工具即可完成用户任务。相反，智能体以其原生模态交换上下文、状态、指令和数据。

- **简单**：重用现有标准
- **安全**：企业级身份验证和授权
- **互操作**：自然模态的交互
- **可扩展**：支持多种运行时和语言

![A2A 横幅](../images/a2a_banner.png) 

## 解锁协作式智能体交互场景，构建全新开放协议

<img src="../images/a2a_main.png" width="70%" style="margin:20px auto;display:block;">

* **无缝智能体协作**：为不同框架和供应商构建的自主、不透明智能体引入标准协议，使其能够与彼此和用户高效沟通和协作，解决当前智能体互操作性缺失的问题。
* **简化企业智能体集成**：提供一种直接的方式将智能体集成到现有企业应用中，使企业能够在技术生态中利用智能体能力。
* **支持关键企业需求**：提供安全、企业级智能体生态系统所需的核心功能，包括能力发现、用户体验协商、任务和状态管理以及安全协作。

## 连接智能体的开放标准

<img src="../images/a2a_mcp_readme.png" width="70%" style="margin:20px auto;display:block;">

* **MCP (模型上下文协议)** 用于工具和资源
  * 将智能体连接到具有结构化输入/输出的工具、API和资源。
  * Google ADK支持MCP工具，使大量MCP服务器能够与智能体一起使用。
* **A2A (Agent2Agent 协议)** 用于智能体间协作
  * 不同智能体之间的动态、多模态通信，无需共享记忆、资源和工具
  * 由社区驱动的开放标准
  * 使用Google ADK、LangGraph、Crew.AI的示例可用

了解A2A设计原则和支持A2A的外部合作伙伴，请参阅[公开博客文章](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)

有兴趣贡献并了解更多A2A协议内部机制？请访问[Github](https://github.com/google/A2A) 




   
