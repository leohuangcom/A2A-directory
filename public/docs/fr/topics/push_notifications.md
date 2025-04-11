# Notifications Push

**Résumé :** A2A permet les notifications push entre agents distants et clients.

<!-- TOC -->

- [Notifications Push](#notifications-push)
  - [Flux de Travail de Base](#flux-de-travail-de-base)
  - [Configuration](#configuration)
  - [Règles](#règles)
  - [Événements JSON-RPC](#événements-json-rpc)
  - [Validation](#validation)

<!-- /TOC -->

## Flux de Travail de Base

Les notifications push permettent aux agents de notifier les clients des mises à jour lorsque la connexion entre eux est
interrompue. Le flux de travail de base est le suivant :

1. Le client envoie une tâche à l'agent
2. L'agent reçoit la tâche et commence le traitement
3. Le client se déconnecte
4. L'agent envoie une notification push à la fin de la tâche
5. Le client reçoit la notification et récupère le résultat de la tâche

## Configuration

Pour activer les notifications push, la configuration suivante est requise :

1. **Côté Agent**

   - Configuration du service de notifications push
   - Exposition du point de terminaison de notification
   - Gestion des identifiants

2. **Côté Client**
   - Configuration du point de terminaison de réception des notifications
   - Implémentation de la logique de traitement des notifications
   - Configuration de la sécurité

## Règles

Les règles suivantes s'appliquent à l'implémentation des notifications push :

1. **Format de Notification**

   - Conformité au format JSON-RPC 2.0
   - Inclusion des métadonnées nécessaires
   - Payload chiffré

2. **Garantie de Livraison**

   - Garantie de livraison au moins une fois
   - Gestion des notifications en double
   - Tentatives en cas d'erreur

3. **Sécurité**
   - Chiffrement de bout en bout
   - Authentification et autorisation
   - Prévention de la falsification

## Événements JSON-RPC

Les notifications push utilisent l'événement JSON-RPC suivant :

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

## Validation

La validation des notifications push nécessite les étapes suivantes :

1. **Validation de l'Expéditeur**

   - Vérification de la signature numérique
   - Authentification de la source
   - Validation de l'horodatage

2. **Validation du Contenu**

   - Vérification de l'intégrité du payload
   - Validation du schéma
   - Application des règles métier

3. **Confirmation de Livraison**
   - Envoi d'accusés de réception
   - Gestion des erreurs
   - Journalisation
