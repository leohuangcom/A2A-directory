# Notificações Push

**Resumo:** O A2A permite notificações push entre agentes remotos e clientes.

<!-- TOC -->

- [Notificações Push](#notificações-push)
  - [Fluxo de Trabalho Básico](#fluxo-de-trabalho-básico)
  - [Configuração](#configuração)
  - [Regras](#regras)
  - [Eventos JSON-RPC](#eventos-json-rpc)
  - [Validação](#validação)

<!-- /TOC -->

## Fluxo de Trabalho Básico

As notificações push permitem que os agentes notifiquem os clientes sobre atualizações quando a conexão entre eles é
interrompida. O fluxo de trabalho básico é o seguinte:

1. O cliente envia uma tarefa para o agente
2. O agente recebe a tarefa e inicia o processamento
3. O cliente desconecta
4. O agente envia uma notificação push quando a tarefa é concluída
5. O cliente recebe a notificação e recupera o resultado da tarefa

## Configuração

Para habilitar notificações push, a seguinte configuração é necessária:

1. **Lado do Agente**

   - Configuração do serviço de notificações push
   - Exposição do endpoint de notificação
   - Gerenciamento de credenciais

2. **Lado do Cliente**
   - Configuração do endpoint de recebimento de notificações
   - Implementação da lógica de processamento de notificações
   - Configuração de segurança

## Regras

As seguintes regras se aplicam à implementação de notificações push:

1. **Formato da Notificação**

   - Conformidade com o formato JSON-RPC 2.0
   - Inclusão de metadados necessários
   - Payload criptografado

2. **Garantia de Entrega**

   - Garantia de entrega pelo menos uma vez
   - Tratamento de notificações duplicadas
   - Tentativas em caso de erro

3. **Segurança**
   - Criptografia de ponta a ponta
   - Autenticação e autorização
   - Prevenção de adulteração

## Eventos JSON-RPC

As notificações push usam o seguinte evento JSON-RPC:

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

## Validação

A validação de notificações push requer as seguintes etapas:

1. **Validação do Remetente**

   - Verificação de assinatura digital
   - Autenticação da origem
   - Validação de timestamp

2. **Validação de Conteúdo**

   - Verificação de integridade do payload
   - Validação de esquema
   - Aplicação de regras de negócio

3. **Confirmação de Entrega**
   - Envio de confirmação de recebimento
   - Tratamento de erros
   - Registro de logs
