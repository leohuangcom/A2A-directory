# Notificaciones Push

**Resumen:** A2A permite notificaciones push entre agentes remotos y clientes.

<!-- TOC -->
- [Notificaciones Push](#notificaciones-push)
  - [Flujo de Trabajo Básico](#flujo-de-trabajo-básico)
  - [Configuración](#configuración)
  - [Reglas](#reglas)
  - [Eventos JSON-RPC](#eventos-json-rpc)
  - [Validación](#validación)

<!-- /TOC -->

## Flujo de Trabajo Básico

Las notificaciones push permiten que los agentes notifiquen a los clientes sobre actualizaciones cuando la conexión entre ellos se interrumpe. El flujo de trabajo básico es el siguiente:

1. El cliente envía una tarea al agente
2. El agente recibe la tarea y comienza el procesamiento
3. El cliente se desconecta
4. El agente envía una notificación push cuando se completa la tarea
5. El cliente recibe la notificación y recupera el resultado de la tarea

## Configuración

Para habilitar las notificaciones push, se requiere la siguiente configuración:

1. **Lado del Agente**
   - Configuración del servicio de notificaciones push
   - Exposición del endpoint de notificación
   - Gestión de credenciales

2. **Lado del Cliente**
   - Configuración del endpoint de recepción de notificaciones
   - Implementación de la lógica de procesamiento de notificaciones
   - Configuración de seguridad

## Reglas

Las siguientes reglas se aplican a la implementación de notificaciones push:

1. **Formato de Notificación**
   - Conformidad con el formato JSON-RPC 2.0
   - Inclusión de metadatos necesarios
   - Payload cifrado

2. **Garantía de Entrega**
   - Garantía de entrega al menos una vez
   - Manejo de notificaciones duplicadas
   - Reintentos en caso de error

3. **Seguridad**
   - Cifrado de extremo a extremo
   - Autenticación y autorización
   - Prevención de manipulación

## Eventos JSON-RPC

Las notificaciones push utilizan el siguiente evento JSON-RPC:

```json
{
  "jsonrpc": "2.0",
  "method": "task.update",
  "params": {
    "taskId": "string",
    "status": "string",
    "result": "object"
  }
}
```

## Validación

La validación de notificaciones push requiere los siguientes pasos:

1. **Validación del Remitente**
   - Verificación de firma digital
   - Autenticación del origen
   - Validación de marca de tiempo

2. **Validación de Contenido**
   - Verificación de integridad del payload
   - Validación de esquema
   - Aplicación de reglas de negocio

3. **Confirmación de Entrega**
   - Envío de confirmación de recepción
   - Manejo de errores
   - Registro de logs 