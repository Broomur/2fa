# Artisan API (express.js + postgresql)

## Prérequis

- Docker
- Node.js

## Installation

- Se placer dans le dossier du code source,
- `npm i` pour installer les dépendances,
- `npm run db` dans un terminal afin de démarrer la base de données,
- `npm run populate` pour appliquer les contraintes sur la base de données,
- `npm run dev` pour démarrer le serveur de développement.

À des fins de développement, un user est créé dans la base de données `admin@email.com`, password: `password`.

## Spécifications techniques

- L'API utilise l'algorithme Argon2 pour chiffrer les mots de passes en base de données.
- Elle utilise également le JSONWebToken pour gérer les sessions des utilisateurs (un token délivré lors du login, valable 1h, non renouvelable et blacklisté lors du logout).
- Elle fonctionne avec postgresql. Attention dans un cadre de développement, les données enregistrées dans l'image docker postgresql ne seront pas persistantes.
- Elle utilise cors, cookieParser et dotenv (uniquement en développement pour ce dernier)
- La vérification de la validité du JWToken se fait via un middleware (./middlewares/TokenVerifyMiddleware.js)
- La logique métier se fait au sein de trois contrôleurs ./controllers/AuthController.js, ./controllers/FurnitureController.js, ./controllers/MaterialsController.js
- Ces contrôleurs sont appelés dans les fichiers de routes correspondants (dans ./routes)
- Ils font appel aux modèles situés dans le dossier ./models
- La connexion à la base de données est instanciée dans ./models/index.js
- Les associations entre les différentes tables sont définies dans ./models/associations.js

## Endpoints

Ci-dessous, les endpoints de l'API avec les méthodes supportées. Les méthodes en italique sont privées et soumises à vérification du JWToken.

- /login [ POST ]
- /logout [ *GET* ]
- furniture [ GET, *POST*, *PUT*, *DELETE* ]
- furniture/:category [ GET ]
- /furniture?material[ &material ... ] [ GET ]
- /materials [ GET ]