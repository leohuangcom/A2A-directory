# A2A ❤️ MCP

**Resumo:** Aplicações de agentes precisam usar tanto A2A quanto MCP. Recomendamos usar MCP para ferramentas e A2A para agentes.

<!-- TOC -->
- [A2A ❤️ MCP](#a2a--mcp)
  - [Por que precisamos de protocolos?](#por-que-precisamos-de-protocolos)
  - [Relação Complementar](#relação-complementar)
  - [Exemplo](#exemplo)
  - [Ponto de Interseção](#ponto-de-interseção)

<!-- /TOC -->

## Por que precisamos de protocolos?

Protocolos padrão são essenciais para permitir a interoperabilidade de agentes, especialmente ao conectar agentes a sistemas externos. Isso é particularmente crítico em dois domínios de inovação inter-relacionados: ferramentas e agentes.

**Ferramentas** são primitivos com entradas e saídas estruturadas, geralmente com comportamento conhecido. **Agentes** são aplicações autônomas capazes de realizar novas tarefas usando ferramentas, raciocínio e interação com o usuário. Aplicações de agentes precisam usar tanto ferramentas **quanto** agentes para atingir os objetivos do usuário.

## Relação Complementar

O [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) é um padrão emergente para conectar LLMs a dados, recursos e ferramentas. Já observamos o MCP padronizando "chamadas de função" entre diferentes modelos e frameworks. Isso está criando um ecossistema de provedores de serviços de ferramentas e reduzindo drasticamente a complexidade de conectar agentes a ferramentas e dados. À medida que mais frameworks, provedores de serviços e plataformas adotam o MCP, esperamos que essa tendência continue.

O A2A se concentra em um problema diferente. O A2A é um protocolo de nível de aplicação que permite que os agentes colaborem em suas modalidades naturais. Ele permite que os agentes se comuniquem como *agentes* (ou como usuários) em vez de como ferramentas. Esperamos que o A2A seja adotado como complemento ao MCP, possibilitando o ecossistema de agentes, e trabalharemos abertamente com a comunidade para alcançar isso.

## Exemplo

Vamos ver um exemplo:

*Considere uma oficina mecânica que repara carros. A oficina emprega trabalhadores autônomos que usam ferramentas de propósito específico (como macacos de carro, multímetros e chaves de soquete) para diagnosticar e reparar problemas. Os trabalhadores frequentemente precisam diagnosticar e reparar problemas que nunca viram antes. O processo de reparo pode envolver conversas extensas com o cliente, pesquisa e colaboração com fornecedores de peças.*

Agora vamos modelar os trabalhadores da oficina como agentes de IA:

* O MCP é o protocolo que conecta esses agentes às suas ferramentas estruturadas (por exemplo, `elevar a plataforma 2 metros`, `girar a chave 4mm para a direita`).

* O A2A é o protocolo que permite que usuários finais ou outros agentes colaborem com os trabalhadores da oficina (*"meu carro está fazendo um barulho de batida"*). O A2A suporta comunicação contínua e planos em evolução para alcançar resultados (*"me envie uma foto da roda esquerda"*, *"notei um vazamento de fluido. Há quanto tempo isso está acontecendo?"*). O A2A também ajuda os trabalhadores da oficina a colaborar com outros agentes, como fornecedores de peças.

## Ponto de Interseção

Recomendamos que as aplicações modelem agentes A2A como recursos MCP (representados por seu [cartão de agente](/documentation.md#agent-card)). Então, os frameworks podem usar o A2A para se comunicar com seus usuários, agentes remotos e outros agentes.

![Aplicação de agente mostrando A2A e MCP trabalhando juntos](../images/a2a_mcp.png) 