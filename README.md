Aura mini

Aura mini est une petite IA de questions-réponses fonctionnant directement dans le navigateur, sans serveur backend et sans API externe.

Elle utilise un corpus local de questions/réponses et un moteur de recherche basé sur TF-IDF, combiné à plusieurs méthodes de similarité pour retrouver la réponse la plus pertinente.

Fonctionnalités

- Fonctionnement entièrement local dans le navigateur
- Aucun serveur backend nécessaire
- Aucun appel à une API d'IA externe
- Recherche de réponses par similarité
- Moteur TF-IDF
- Similarité cosinus
- Score de recouvrement Jaccard
- Analyse des bigrammes
- Détection des correspondances exactes
- Suggestions de questions similaires
- Historique des conversations
- Possibilité de démarrer une nouvelle conversation
- Copie des réponses
- Régénération d'une réponse
- Interface responsive adaptée aux appareils mobiles
- Chargement de données depuis des fichiers ".txt" ou ".json"

Architecture

Aura mini
│
├── index.html
│
├── data1.txt
│
└── data2.txt

Les données peuvent être séparées en plusieurs fichiers afin d'éviter d'avoir un fichier unique trop volumineux.

data1.txt ─┐
           ├──> Parser ──> Corpus ──> TF-IDF ──> Recherche
data2.txt ─┘

Les deux fichiers sont ensuite considérés comme une seule base de questions/réponses.

Format des données

Aura mini accepte notamment une structure de type :

[
    ("Bonjour", "Bonjour ! Comment puis-je vous aider ?"),
    ("Comment vas-tu ?", "Je vais bien, merci !"),
    ("Qu'est-ce que Python ?", "Python est un langage de programmation.")
]

Chaque élément doit contenir :

(Question, Réponse)

Moteur de recherche

Aura mini ne génère pas les réponses comme un grand modèle de langage.

Il recherche une réponse existante dans le corpus.

Le moteur combine plusieurs critères :

1. Correspondance exacte

Si la question de l'utilisateur correspond exactement à une question du corpus, celle-ci est privilégiée.

2. TF-IDF

Le moteur calcule une représentation TF-IDF des questions afin d'identifier les documents contenant les termes les plus importants.

3. Similarité cosinus

La similarité cosinus permet de mesurer la proximité entre la question de l'utilisateur et les questions présentes dans le corpus.

4. Jaccard

Le score de Jaccard compare les mots importants présents dans les deux questions.

5. Bigrammes

Les groupes de deux mots consécutifs sont également utilisés pour améliorer la précision lorsque plusieurs mots apparaissent dans le même ordre.

Le score final combine ces différentes méthodes.

Score final =
    TF-IDF       × 0.45
  + Jaccard      × 0.35
  + Bigrammes    × 0.20

Fonctionnement

Lorsqu'un utilisateur pose une question :

Utilisateur
     │
     ▼
Normalisation
     │
     ▼
Tokenisation
     │
     ▼
Suppression des mots inutiles
     │
     ▼
Stemming
     │
     ▼
TF-IDF + Jaccard + Bigrammes
     │
     ▼
Classement des résultats
     │
     ▼
Meilleure réponse

Installation

Aucune installation complexe n'est nécessaire.

Clonez ou téléchargez le projet puis placez les fichiers dans le même dossier :

Aura-mini/
├── index.html
├── data1.txt
└── data2.txt

Vous pouvez ensuite utiliser un serveur HTTP local ou héberger le projet sur un service statique.

«L'utilisation d'un serveur local est recommandée pour éviter les restrictions du navigateur concernant "fetch()" sur les fichiers locaux.»

Utilisation

Ouvrez "index.html", attendez le chargement du corpus puis posez une question.

Exemple :

Vous :
Qu'est-ce que Python ?

Aura :
Python est un langage de programmation.

Données volumineuses

Lorsque le corpus devient trop important, il est possible de le diviser :

data.txt
   │
   ├──> data1.txt
   │
   └──> data2.txt

Cela permet d'organiser plus facilement le corpus.

Les fichiers peuvent ensuite être chargés ensemble par Aura mini.

Confidentialité

Aura mini est conçu pour fonctionner localement.

Les questions de l'utilisateur et le corpus ne sont pas envoyés à une API d'IA externe par le moteur de recherche.

L'historique des conversations est conservé localement dans le navigateur via "localStorage".

Limitations

Aura mini possède une architecture volontairement légère.

Il ne possède pas les capacités génératives d'un grand modèle de langage.

Il peut donc :

- ne pas trouver une réponse si elle n'existe pas dans le corpus ;
- retourner une réponse imparfaite lorsqu'une question est très différente de celles du corpus ;
- être limité par la taille du corpus et la mémoire disponible du navigateur ;
- ne pas comprendre réellement le contexte comme un LLM.

La qualité des réponses dépend donc fortement de la qualité et de la diversité du corpus.

Technologies

- HTML5
- CSS3
- JavaScript
- TF-IDF
- Similarité cosinus
- Jaccard
- Bigrammes
- "localStorage"
- API "FileReader"
- API "fetch"

Aucune bibliothèque JavaScript externe n'est nécessaire pour le moteur de recherche.

Objectif

L'objectif d'Aura mini est de proposer une architecture d'assistant simple, légère et exécutable localement, notamment sur des appareils disposant de ressources limitées.

Le projet peut servir de base pour expérimenter :

- le NLP ;
- la recherche d'information ;
- la vectorisation TF-IDF ;
- les systèmes QA ;
- la comparaison de méthodes de similarité ;
- la construction de petits assistants locaux.

Licence

Projet développé par Sanogo.

Aura mini © 2026

---

Structure du projet

Aura-mini/
│
├── index.html       # Interface et moteur de recherche
├── data1.txt        # Première partie du corpus
├── data2.txt        # Deuxième partie du corpus
└── README.md        # Documentation

Aura mini — Small, local, lightweight.
