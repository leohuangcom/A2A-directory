# A2A ❤️ MCP

**Résumé :** Les applications d'agents doivent utiliser à la fois A2A et MCP. Nous recommandons d'utiliser MCP pour les outils et A2A pour les agents.

<!-- TOC -->
- [A2A ❤️ MCP](#a2a--mcp)
  - [Pourquoi avons-nous besoin de protocoles ?](#pourquoi-avons-nous-besoin-de-protocoles)
  - [Relation Complémentaire](#relation-complémentaire)
  - [Exemple](#exemple)
  - [Point d'Intersection](#point-dintersection)

<!-- /TOC -->

## Pourquoi avons-nous besoin de protocoles ?

Les protocoles standard sont essentiels pour permettre l'interopérabilité des agents, en particulier lors de la connexion d'agents à des systèmes externes. Ceci est particulièrement critique dans deux domaines d'innovation interdépendants : les outils et les agents.

**Les outils** sont des primitifs avec des entrées et sorties structurées, généralement avec un comportement connu. **Les agents** sont des applications autonomes capables d'accomplir de nouvelles tâches en utilisant des outils, le raisonnement et l'interaction avec l'utilisateur. Les applications d'agents doivent utiliser à la fois des outils **et** des agents pour atteindre les objectifs de l'utilisateur.

## Relation Complémentaire

Le [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) est une norme émergente pour connecter les LLM aux données, ressources et outils. Nous observons déjà comment MCP standardise les "appels de fonction" entre différents modèles et frameworks. Cela crée un écosystème de fournisseurs de services d'outils et réduit considérablement la complexité de la connexion des agents aux outils et aux données. À mesure que de plus en plus de frameworks, fournisseurs de services et plateformes adoptent MCP, nous nous attendons à ce que cette tendance se poursuive.

A2A se concentre sur un problème différent. A2A est un protocole de niveau application qui permet aux agents de collaborer dans leurs modalités naturelles. Il permet aux agents de communiquer en tant qu'*agents* (ou en tant qu'utilisateurs) plutôt qu'en tant qu'outils. Nous nous attendons à ce qu'A2A soit adopté comme complément à MCP, permettant l'écosystème des agents, et nous travaillerons ouvertement avec la communauté pour y parvenir.

## Exemple

Prenons un exemple :

*Considérons un atelier de réparation automobile qui répare des voitures. L'atelier emploie des travailleurs autonomes qui utilisent des outils à usage spécifique (comme des crics, des multimètres et des clés à douille) pour diagnostiquer et réparer des problèmes. Les travailleurs doivent souvent diagnostiquer et réparer des problèmes qu'ils n'ont jamais vus auparavant. Le processus de réparation peut impliquer des conversations approfondies avec le client, des recherches et une collaboration avec des fournisseurs de pièces.*

Modélisons maintenant les travailleurs de l'atelier comme des agents d'IA :

* MCP est le protocole qui connecte ces agents à leurs outils structurés (par exemple, `soulever la plateforme de 2 mètres`, `tourner la clé de 4 mm vers la droite`).

* A2A est le protocole qui permet aux utilisateurs finaux ou à d'autres agents de collaborer avec les travailleurs de l'atelier (*"ma voiture fait un bruit de cognement"*). A2A prend en charge la communication continue et les plans en évolution pour atteindre des résultats (*"envoyez-moi une photo de la roue gauche"*, *"j'ai remarqué une fuite de liquide. Depuis combien de temps cela dure-t-il ?"*). A2A aide également les travailleurs de l'atelier à collaborer avec d'autres agents, comme les fournisseurs de pièces.

## Point d'Intersection

Nous recommandons que les applications modélisent les agents A2A comme des ressources MCP (représentées par leur [carte d'agent](/documentation.md#agent-card)). Ensuite, les frameworks peuvent utiliser A2A pour communiquer avec leurs utilisateurs, les agents distants et d'autres agents.

![Application d'agent montrant A2A et MCP travaillant ensemble](../images/a2a_mcp.png) 