# React-router

[React-router](https://reactrouter.com/en/main)

Utiliser la bibliothèque `React Router` pour réaliser une application dont le contenu de l'interface évolue dynamiquement en fonction de l'état courant de la route __client__.

Mise en place
---

Initialiser un nouveau dossier `tp4` avec `vite`.
Puis :
- Écraser le contenu du fichier `src/index.css` par le contenu du fichier du même nom situé dans le dossier `ressources`.
- Supprimer le fichier `src/App.css`.
- Supprimer le fichier `src/App.tsx`.

Installer le paquet `react-router-dom` :
```
npm install react-router-dom
```

Contrairement aux sujets précédents, on va commencer ici à travailler dans le fichier `src/main.tsx`.

Déclaration des routes
---

Dans le fichier `src/main.tsx`, importer les symboles `createBrowserRouter`, `RouterProvider` et `Navigate` depuis le module `react-router-dom`.

Comme illustré au début de la section "Overview" de la documentation (https://reactrouter.com/en/main/start/overview), créer un objet `router` avec la fonction `createBrowserRouter`. Vous pouvez commencer à tester des choses en copiant simplement l'exemple de la documentation.

- Créer un dossier `routes` au sein du dossier `src`.
- Copier le module `root.tsx` depuis le dossier `ressources` dans le dossier `routes`.
- Dans le module `main.tsx`, importer le composant `Root` du module `root.tsx`.
- Dans le `router`, associer une instance de l'élément `<Root />` à la route de chemin `"/"`.

L'élément `<Outlet />` qui est déclaré dans le composant `Root` est l'emplacement dans lequel sera rendu l'élément associé à l'éventuelle route fille matchée par la route courante.

- Déclarer 2 routes filles à la route `"/"` : `"items"` et `"grocery"`.
- Récupérer les composants `ItemsApp` et `GroceryApp` (ainsi que les autres composants qui vont avec), et les exporter respectivement depuis des modules `items.tsx` et `grocery.tsx` stockés dans le dossier `routes`.
- Importer ces composants dans le module `main.tsx` et les associer en tant qu'élément dans leur route respective.

Vous pouvez déjà essayer de changer de route en modifiant directement cette dernière dans la barre d'adresse de votre navigateur.

Navigation
---

Afin de pouvoir changer de route interactivement, on peut utiliser l'élément `<Link>` fourni par `React Router` (https://reactrouter.com/en/main/components/link) :
- Dans le `<header>` du composant `Root`, ajouter dans la liste des liens vers les routes `"/items"` et `"/grocery"`.
- Utiliser des éléments `<NavLink>` (https://reactrouter.com/en/main/components/nav-link) plutôt que des `<Link>` et constater que `React Router` donne automatiquement la classe CSS `"active"` (pour laquelle du CSS est prévu dans le fichier `index.css`) aux liens dont le chemin correspond à la route courante.

Si la persistance des données dans le `localStorage` du navigateur n'est pas réalisée, on constate que les données sont réinitialisées à chaque fois que les composants intègrent à nouveau l'interface.

Index
---

Quand une route dispose de routes filles, son élément contient un `<Outlet>` dans lequel sera rendu l'élément associé à la route fille matchée par la route courante.

Quand la route courante s'arrête *exactement* au chemin de la route mère, aucune de ses filles ne matche et l'`<Outlet>` reste vide.

La définition d'une route fille `index` permet de définir un élément à rendre dans l'`<Outlet>` dans ce cas là :
- Ajouter une route fille `index` dans laquelle on affiche un message de bienvenue.

Catch all
---

Que se passe-t-il quand l'utilisateur saisit dans la barre d'adresse une route qui ne correspond à aucun des chemins gérés par l'application ?

`React Router` génère une erreur. Comme l'application ne gère pas encore les erreurs (https://reactrouter.com/en/main/route/error-element), c'est l'interface d'erreur par défaut de `React Router` qui s'affiche.

Pour ce cas de figure, il existe un moyen simple de gérer la situation en redirigeant l'utilisateur vers la route `"/"` :
- Déclarer une dernière route dont le chemin est `"*"`.
- Associer un élément `<Navigate>` (https://reactrouter.com/en/main/components/navigate) à cette route avec le chemin `"/"` comme destination.
- Ajouter la propriété `"replace"` à l'élément `<Navigate>` : ainsi, dans l'historique de navigation, la nouvelle route prendra la place de la route erronée.
