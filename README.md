#  Projet React – Générateur dynamique de tableau de besoins en protéines

##  Objectif du projet
Ce projet est une application web en React conçue pour générer dynamiquement un tableau des besoins journaliers en protéines. Le calcul est basé sur plusieurs paramètres personnalisables par l'utilisateur, notamment le poids du corps et les objectifs sportifs.

##  Contexte fonctionnel
Les besoins en protéines sont calculés selon les recommandations suivantes (exprimées en grammes par kilogramme de poids corporel et par jour) :
- **Sédentaire** : 0,8 – 1,0 g/kg/jour
- **Endurance** : 1,2 – 1,6 g/kg/jour
- **Conservation de la masse musculaire** : 1,6 – 1,8 g/kg/jour
- **Prise de masse musculaire** : 1,8 – 2,2 g/kg/jour

## Fonctionnalités
L'application offre une interface intuitive permettant de :
- Sélectionner **un ou plusieurs objectifs** simultanément.
- Définir une plage de poids avec un **poids minimum** et un **poids maximum** (en kg).
- Choisir le **nombre de lignes** à générer entre ce poids minimum et maximum.
- Générer automatiquement et dynamiquement un **tableau de résultats**.
- Afficher les besoins sous forme de **plages de valeurs** (ex: 112 – 126 g/jour).

###  Bonus intégrés :
-  **Validation stricte des champs** : Protection contre les poids négatifs, vérification que le poids minimum est inférieur au maximum, et obligation de sélectionner au moins un objectif.
-  **Design 100% Responsive** : Interface moderne s'adaptant aussi bien aux ordinateurs qu'aux smartphones.
-  **Export CSV** : Possibilité d'exporter le tableau généré au format CSV en un seul clic.

##  Technologies utilisées
- **React 18** (via Vite)
- **TypeScript**
- **Vanilla CSS** 

##  Installation et lancement en local

1. **Cloner le repository** (si ce n'est pas déjà fait) :
   ```bash
   git clone <URL_DE_VOTRE_REPO>
   cd protein-calculator
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

L'application sera accessible (généralement) à l'adresse locale http://localhost:5173/.

##  Structure du projet
- `src/components/` : Contient les composants réutilisables de l'interface (`Header`, `ConfigurationForm`, `ResultsTable`).
- `src/utils/` : Contient la logique métier pure et les calculs dynamiques (`calculator.ts`), garantissant qu'aucune valeur n'est écrite en dur dans les composants.
- `src/types/` : Définitions TypeScript pour assurer la solidité et la cohérence de la donnée.
