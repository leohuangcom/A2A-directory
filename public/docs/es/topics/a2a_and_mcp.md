# A2A ❤️ MCP

**Resumen:** Las aplicaciones de agentes necesitan usar tanto A2A como MCP. Recomendamos usar MCP para herramientas y
A2A para agentes.

<!-- TOC -->

- [A2A ❤️ MCP](#a2a--mcp)
  - [¿Por qué necesitamos protocolos?](#por-qué-necesitamos-protocolos)
  - [Relación Complementaria](#relación-complementaria)
  - [Ejemplo](#ejemplo)
  - [Punto de Intersección](#punto-de-intersección)

<!-- /TOC -->

## ¿Por qué necesitamos protocolos?

Los protocolos estándar son esenciales para permitir la interoperabilidad de los agentes, especialmente al conectar
agentes a sistemas externos. Esto es particularmente crítico en dos dominios de innovación interrelacionados:
herramientas y agentes.

**Las herramientas** son primitivos con entradas y salidas estructuradas, generalmente con comportamiento conocido.
**Los agentes** son aplicaciones autónomas capaces de realizar nuevas tareas usando herramientas, razonamiento e
interacción con el usuario. Las aplicaciones de agentes necesitan usar tanto herramientas **como** agentes para lograr
los objetivos del usuario.

## Relación Complementaria

El [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) es un estándar emergente para conectar LLMs a datos,
recursos y herramientas. Ya estamos observando cómo MCP estandariza "llamadas de función" entre diferentes modelos y
frameworks. Esto está creando un ecosistema de proveedores de servicios de herramientas y reduciendo drásticamente la
complejidad de conectar agentes a herramientas y datos. A medida que más frameworks, proveedores de servicios y
plataformas adoptan MCP, esperamos que esta tendencia continúe.

A2A se centra en un problema diferente. A2A es un protocolo de nivel de aplicación que permite que los agentes colaboren
en sus modalidades naturales. Permite que los agentes se comuniquen como _agentes_ (o como usuarios) en lugar de como
herramientas. Esperamos que A2A sea adoptado como complemento de MCP, permitiendo el ecosistema de agentes, y
trabajaremos abiertamente con la comunidad para lograr esto.

## Ejemplo

Veamos un ejemplo:

_Considere un taller de reparación de automóviles que repara coches. El taller emplea trabajadores autónomos que usan
herramientas de propósito específico (como gatos de coche, multímetros y llaves de tubo) para diagnosticar y reparar
problemas. Los trabajadores a menudo necesitan diagnosticar y reparar problemas que nunca han visto antes. El proceso de
reparación puede involucrar conversaciones extensas con el cliente, investigación y colaboración con proveedores de
piezas._

Ahora modelemos a los trabajadores del taller como agentes de IA:

- MCP es el protocolo que conecta a estos agentes con sus herramientas estructuradas (por ejemplo,
  `elevar la plataforma 2 metros`, `girar la llave 4mm a la derecha`).

- A2A es el protocolo que permite que los usuarios finales u otros agentes colaboren con los trabajadores del taller
  (_"mi coche hace un ruido de golpeteo"_). A2A admite comunicación continua y planes en evolución para lograr
  resultados (_"envíame una foto de la rueda izquierda"_, _"noté una fuga de líquido. ¿Cuánto tiempo lleva
  ocurriendo?"_). A2A también ayuda a los trabajadores del taller a colaborar con otros agentes, como proveedores de
  piezas.

## Punto de Intersección

Recomendamos que las aplicaciones modelen los agentes A2A como recursos MCP (representados por su
[tarjeta de agente](/documentation.md#agent-card)). Luego, los frameworks pueden usar A2A para comunicarse con sus
usuarios, agentes remotos y otros agentes.

![Aplicación de agente mostrando A2A y MCP trabajando juntos](../images/a2a_mcp.png)
