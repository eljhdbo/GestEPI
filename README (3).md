---
title: README

---

# 🦺 GestEPI - Application de gestion des Équipements de Protection Individuelle

> **Application web de gestion des EPI pour une entreprise spécialisée dans les travaux en hauteur.**

---

## 🚀 Présentation du projet

GestEPI est une application web développée dans le cadre de l’épreuve E6 du BTS SIO (option SLAM). Elle permet à une entreprise de gérer l’ensemble de ses Équipements de Protection Individuelle (EPI), de leur enregistrement à leur suivi périodique en passant par des alertes de conformité.  
L'application repose sur une architecture modulaire répartie en trois parties principales :

- Un **backend Express.js** qui gère la logique métier, la base de données (MySQL) et expose une API REST.
- Un **frontend React** avec Vite et Material UI, servant d’interface pour les utilisateurs.
- Un module **d’interfaces TypeScript partagées** pour assurer la cohérence des types entre le backend et le frontend.

---

## ✅ Prérequis

- Node.js
- MySQL (PhpMyAdmin)
- Terminal avec `npm`
- Navigateur web moderne

---

## ⚙️ Installation et configuration

### 1. Installer les dépendances du backend

```bash
cd GestEPIBack
npm install
```

### 2. Installer les dépendances du frontend

```bash
cd ../GestEPIFront
npm install
```

### 3. Compiler les interfaces TypeScript partagées

```bash
cd ../GestEPIInterfaces
npm install
```

Cela génère un dossier dist qui contient les interfaces compilées au format CommonJS.

---

## 🔄 Lancement de l'application

### ▶️ Démarrer le backend (port 3002)

```bash
cd GestEPIBack
node index.js
```

Le backend est accessible à l'adresse : http://localhost:3002

### 💻 Démarrer le frontend (port 5174)

```bash
cd ../GestEPIFront
npm run dev
```

L’interface utilisateur est accessible à : http://localhost:5174

---

## 🧭 Fonctionnalités de l'application

L’application permet à l’entreprise de suivre avec précision ses équipements de protection grâce aux fonctionnalités suivantes :

### 🎛️ Gestion des EPI

Les utilisateurs peuvent enregistrer de nouveaux équipements, les modifier ou les supprimer. Chaque EPI est présenté dans un tableau avec ses attributs principaux (marque, modèle, taille, couleur, etc.).

### 📋 Suivi des contrôles périodiques

Chaque EPI peut être associé à des contrôles périodiques. L’historique complet de ces contrôles est consultable, et chaque enregistrement peut être visualisé dans une fenêtre popup dédiée.

### 🔔 Alertes de conformité

Une alerte visuelle signale les EPI devant être contrôlés dans les 30 jours. Le backend expose une route dédiée `/api/controles/send-alerts` pour identifier ces équipements. Le frontend affiche les alertes avec une icône d’avertissement et une section dédiée à la gestion de ces notifications.

---

## 🔗 Liens de test

- Interface utilisateur : http://localhost:5174  
- API Backend : http://localhost:3002/api  
- Route d’alerte : http://localhost:3002/api/controles/send-alerts

---

## 🧪 Vérification

Lors du lancement, le terminal du backend doit indiquer :

```bash
✅ Serveur backend démarré sur le port 3002
```

Le frontend doit afficher les tableaux des EPI et des contrôles sans erreur en console.

---

## 🧰 Technologies utilisées

- Backend : Node.js, Express, MySQL, CommonJS  
- Frontend : React, Vite, TypeScript, Material UI (MUI)  
- Interfaces partagées : TypeScript, compilées via `tsc` en CommonJS

---

