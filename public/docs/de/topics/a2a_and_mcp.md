# A2A ❤️ MCP

**Zusammenfassung:** Agentenanwendungen müssen sowohl A2A als auch MCP verwenden. Wir empfehlen MCP für Tools und A2A
für Agenten.

<!-- TOC -->

- [A2A ❤️ MCP](#a2a--mcp)
  - [Warum brauchen wir Protokolle?](#warum-brauchen-wir-protokolle)
  - [Komplementäre Beziehung](#komplementäre-beziehung)
  - [Beispiel](#beispiel)
  - [Schnittpunkt](#schnittpunkt)

<!-- /TOC -->

## Warum brauchen wir Protokolle?

Standardprotokolle sind unerlässlich, um die Interoperabilität von Agenten zu ermöglichen, insbesondere beim Anschluss
von Agenten an externe Systeme. Dies ist besonders kritisch in zwei miteinander verbundenen Innovationsbereichen: Tools
und Agenten.

**Tools** sind Primitiven mit strukturierten Ein- und Ausgaben, in der Regel mit bekanntem Verhalten. **Agenten** sind
autonome Anwendungen, die neue Aufgaben mit Tools, Schlussfolgerungen und Benutzerinteraktionen ausführen können.
Agentenanwendungen müssen sowohl Tools **als auch** Agenten verwenden, um die Ziele des Benutzers zu erreichen.

## Komplementäre Beziehung

Das [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) ist ein aufstrebender Standard für die Verbindung
von LLMs mit Daten, Ressourcen und Tools. Wir beobachten bereits, wie MCP "Funktionsaufrufe" zwischen verschiedenen
Modellen und Frameworks standardisiert. Dies schafft ein Ökosystem von Tool-Dienstanbietern und reduziert die
Komplexität der Verbindung von Agenten mit Tools und Daten drastisch. Da immer mehr Frameworks, Dienstanbieter und
Plattformen MCP übernehmen, erwarten wir, dass sich dieser Trend fortsetzt.

A2A konzentriert sich auf ein anderes Problem. A2A ist ein Anwendungsprotokoll, das es Agenten ermöglicht, in ihren
natürlichen Modalitäten zusammenzuarbeiten. Es ermöglicht Agenten, sich als _Agenten_ (oder als Benutzer) und nicht als
Tools zu kommunizieren. Wir erwarten, dass A2A als Ergänzung zu MCP übernommen wird, was das Agentenökosystem
ermöglicht, und wir werden offen mit der Community zusammenarbeiten, um dies zu erreichen.

## Beispiel

Lassen Sie uns ein Beispiel betrachten:

_Stellen Sie sich eine Autowerkstatt vor, die Autos repariert. Die Werkstatt beschäftigt autonome Arbeiter, die
spezialisierte Tools (wie Wagenheber, Multimeter und Steckschlüssel) verwenden, um Probleme zu diagnostizieren und zu
reparieren. Die Arbeiter müssen oft Probleme diagnostizieren und reparieren, die sie noch nie zuvor gesehen haben. Der
Reparaturprozess kann umfangreiche Gespräche mit dem Kunden, Recherchen und Zusammenarbeit mit Ersatzteillieferanten
umfassen._

Lassen Sie uns nun die Werkstattmitarbeiter als KI-Agenten modellieren:

- MCP ist das Protokoll, das diese Agenten mit ihren strukturierten Tools verbindet (z.B. `Plattform 2 Meter anheben`,
  `Schlüssel 4mm nach rechts drehen`).

- A2A ist das Protokoll, das es Endbenutzern oder anderen Agenten ermöglicht, mit den Werkstattmitarbeitern
  zusammenzuarbeiten (_"mein Auto macht ein Klopfgeräusch"_). A2A unterstützt kontinuierliche Kommunikation und sich
  entwickelnde Pläne zur Erreichung von Ergebnissen (_"schicken Sie mir ein Foto des linken Rades"_, _"ich habe ein
  Flüssigkeitsleck bemerkt. Wie lange geht das schon?"_). A2A hilft den Werkstattmitarbeitern auch bei der
  Zusammenarbeit mit anderen Agenten, wie Ersatzteillieferanten.

## Schnittpunkt

Wir empfehlen, dass Anwendungen A2A-Agenten als MCP-Ressourcen modellieren (dargestellt durch ihre
[Agentenkarte](/documentation.md#agent-card)). Dann können Frameworks A2A verwenden, um mit ihren Benutzern, entfernten
Agenten und anderen Agenten zu kommunizieren.

![Agentenanwendung, die A2A und MCP zusammenarbeitend zeigt](../images/a2a_mcp.png)
