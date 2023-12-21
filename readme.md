# Artisan API (express.js + postgresql)

## Prérequis :

- Docker
- Node.js

## Installation :

- Se placer dans le dossier du code source
- `npm run db` dans un terminal afin de démarrer la base de données.
- `npm run populate` pour appliquer les contraintes sur la base de données.
- `npm run dev` pour démarrer le serveur de développement.

À des fins de développement, un user est créé dans la base de données : `admin@email.com`, password: `password`.

## Spécifications techniques :

- L'API utilise l'algorithme Argon2 pour chiffrer les mots de passes en base de données.
- Elle utilise également le JSONWebToken pour gérer les sessions des utilisateurs (un token délivré lors du login, valable 1h, non renouvelable et blacklisté lors du logout).
- Elle fonctionne avec postgresql. Attention : dans un cadre de développement, les données enregistrées dans l'image docker postgresql ne seront pas persistantes.
