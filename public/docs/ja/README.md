# Agent2Agent プロトコル (A2A)

不透明なエージェントシステム間の相互運用性を実現するオープンプロトコルです。

![A2A アクター](../images/a2a_actors.png)

## フィードバックと変更

A2Aは進行中の作業であり、コミュニティのフィードバックに基づいて変更される予定です。このリポジトリには、初期仕様、ドキュメント、および[サンプルコード](https://github.com/google/A2A/tree/main/samples)が含まれています。より多くの機能、例、仕様、ライブラリでこのリポジトリを更新し続けます。仕様とサンプルが本番品質のSDKにアップグレードできるようになったら、バージョン1.0を宣言し、安定したリリースを維持します。

## 主要原則

A2Aを使用すると、エージェントはメモリ、思考、またはツールを共有せずにエンドユーザーのタスクを達成できます。代わりに、エージェントはネイティブモダリティでコンテキスト、ステータス、指示、およびデータを交換します。

- **シンプル**：既存の標準を再利用
- **セキュア**：エンタープライズグレードの認証と認可
- **相互運用**：自然なモダリティでの対話
- **拡張可能**：多様なランタイムと言語をサポート

![image info](images/a2a_banner.png) 

## Unlock Collaborative, agent to agent scenarios with a new open protocol

<img src="images/a2a_main.png" width="70%" style="margin:20px auto;display:block;">

* **Seamless Agent Collaboration**: Introduces a standard protocol for autonomous, opaque agents built on different frameworks and by various vendors to communicate and collaborate effectively with each other and with users, addressing the current lack of agent interoperability.
* **Simplifies Enterprise Agent Integration**: Provides a straightforward way to integrate intelligent agents into existing enterprise applications, allowing businesses to leverage agent capabilities across their technology landscape.
* **Supports Key Enterprise Requirements**: Offers core functionalities essential for secure, enterprise-grade agent ecosystems, including capability discovery, user experience negotiation, task and state management, and secure collaboration.

## Open standards for connecting Agents

<img src="images/a2a_mcp_readme.png" width="70%" style="margin:20px auto;display:block;">

* **MCP (Model Context Protocol)** for tools and resources
  * Connect agents to tools, APIs, and resources with structured inputs/outputs.
  * Google ADK supports MCP tools. Enabling wide range of MCP servers to be used with agents.
* **A2A (Agent2Agent Protocol)** for agent-agent collaboration
  * Dynamic, multimodal communication between different agents without sharing memory, resources, and tools
  * Open standard driven by community.
  * Samples available using Google ADK, LangGraph, Crew.AI

To understand A2A design principles and external partners supporting A2A, [public blog post](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)

Interested to contribute and know more about the internals of A2A protocol ? [Github](https://github.com/google/A2A) 




   
