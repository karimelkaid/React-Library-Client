# W42 - TP noté

> Prenez le temps de __bien lire l'ensemble__ du sujet avant de vous lancer.

> - Vous avez le droit à vos TP, à la documentation et à copilot.
> - Vous n'avez pas le droit de communiquer entre vous, ni d'utiliser des chatbots.

<hr />

On se propose de développer une application web qui permet de gérer des _recettes de pâtisserie_.

Pour cela vous disposez déjà :
 - d'une API HTTP (dossier `server`)
 - d'une base de code __React__ (dossier `client`) à compléter

Entités manipulées
==================

Les entités gérées par l'API sont les suivantes :
- `Ingredient` :
   - `nom` : nom de l'ingrédient (`string`)
   - `unite` : unité de mesure de l'ingrédient (`string`)
 - `Recette` :
   - `titre` : titre de la recette (`string`)
   - `instructions` : instructions de la recette (`string`)

Les relations entre ces entités sont les suivantes :
 - une `Recette` est associée à plusieurs `Ingredient`
 - un `Ingredient` peut être associé à plusieurs `Recette`

Cette liaison `many-to-many` contient en plus la propriété :
 - `quantite` (`number`) : la quantite de l'ingrédient utilisé dans la recette.

> Les détails des routes exposées par l'API et des objets reçus en réponse ou attendus avec les requêtes sont donnés en fin de sujet.

Fonctionnalités attendues
=========================

L'application attendue contient 2 sections :
 - une section qui permet de gérer les `Ingredient`
 - une section qui permet de gérer les `Recette`

**Déclarer les routes de l'application dans le fichier `client/src/main.tsx`, et les liens nécessaires dans le fichier `client/src/routes/root.tsx`.**

Les fonctionnalités attendues pour la section `Ingredient` sont les suivantes :
 - à la route `/ingredients` :
   - afficher la liste _paginée_ des `Ingredient` (`nom`) (sous la forme de liens vers la page de détail de chaque `Ingredient`)
   - ajouter un `Ingredient`
   - supprimer un `Ingredient`
 - à la route `/ingredient/:ingredient_id` :
   - afficher le détail d'un `Ingredient` (`nom` et `unite`)
   - modifier cet `Ingredient` (`nom` et `unite`)
   - afficher la liste des `Recette` (`titre`) qui utilisent cet `Ingredient` (sous la forme de liens vers la page de détail de chaque `Recette`)

**Ces fonctionnalités seront écrites dans les fichiers `client/src/routes/ingredients.tsx` et `client/src/routes/ingredient.tsx`.**

Les fonctionnalités attendues pour la section `Recette` sont les suivantes :
 - à la route `/recettes` :
   - afficher la liste _paginée_ des `Recette` (`titre`) (sous la forme de liens vers la page de détail de chaque `Recette`)
   - ajouter une `Recette` (en donnant son `titre` uniquement)
   - supprimer une `Recette`
 - à la route `/recette/:recette_id` :
   - afficher le détail d'une `Recette` (`titre` et `instructions`)
   - modifier cette `Recette` (`titre` et `instructions`)
   - afficher la liste des `Ingredient` (`nom`, `unite` et `quantite`) utilisés dans cette `Recette` (sous la forme de liens vers la page de détail de chaque `Ingredient`)
   - ajouter un `Ingredient` à cette `Recette` : pour cela, on a besoin de choisir un `Ingredient` parmi la liste complète des `Ingredient`, et de saisir la quantité de cet `Ingredient` dans la `Recette`
   - supprimer un `Ingredient` de cette `Recette`

**Ces fonctionnalités seront écrites dans les fichiers `client/src/routes/recettes.tsx` et `client/src/routes/recette.tsx`.**

> Vous devez suivre la structure de code fournie, qui suit celle utilisée dans les TP précédents.

**Les types des objets manipulés seront déclarés dans le fichier `client/src/types.ts`, et les fonctions d'accès à l'API dans le fichier `client/src/api.ts`.**

> Pour démarrer, exécutez les commandes suivantes :
> ```sh
> cd client
> npm install
> npm run dev
> ```

**Indications** :
 - lisez bien la documentation de l'API pour comprendre comment manipuler les entités : il y a des routes qui correspondent à chacun des besoins spécifiques de l'application client
 - pour la modification des `instructions` d'une `Recette`, vous pouvez utiliser un `<textarea>` plutôt qu'un `<input>` (et ne perdez pas de temps à tenter d'adapter un éventuel composant `EditableText`)
 - pour l'ajout d'un `Ingredient` à une `Recette`, vous pouvez utiliser un `<select>` pour choisir l'`Ingredient`, et un `<input>` pour saisir la quantité
 - idéalement, la liste des `Ingredient` affichés dans ce `<select>` devrait être filtrée pour ne pas afficher les `Ingredient` déjà associés à la `Recette`
 - pour utiliser un `<select>` au sein d'un `<form>`, vous pouvez utiliser une syntaxe qui ressemble au code suivant :

```jsx
<select name="selectedElem">
{tab.map(elem => (
  <option key={elem.id} value={elem.id}>{elem.nom}</option>
))}
</select>

// dans la fonction qui gère la soumission du form
const selectedElemId = e.currentTarget.selectedElem.value;
```

API HTTP
========

Afin de lancer l'API, vous devez exécuter les commandes suivante :
```sh
cd server
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

<hr />

Pour la manipulation des `Ingredients`, les routes exposées par l'API sont les suivantes :

 - `GET /ingredients` -> récupère tous les ingrédients
 - `GET /ingredients/:ingredient_id` -> récupère un ingrédient

> La forme des objets reçus de l'API pour ces routes est la suivante :
> ```ts
> {
>   id: number,
>   nom: string,
>   unite: string
> }
> ```

 - `POST /ingredients` -> crée un ingrédient (retourne l'entité créée)

> La forme des objets attendus par l'API pour cette route est la suivante :
> ```ts
> {
>   nom: string,
>   unite: string
> }
> ```

 - `PATCH /ingredients/:ingredient_id` -> modifie un ingrédient (retourne l'entité modifiée)

> La forme des objets attendus par l'API pour la modification d'un `Ingredient` est la même que pour la création, mais tous les champs sont optionnels.

 - `DELETE /ingredients/:ingredient_id` -> supprime un ingrédient

<hr />

Pour la manipulation des `Recettes`, les routes exposées par l'API sont les suivantes :

 - `GET /recettes` -> récupère toutes les recettes
 - `GET /recettes/:recette_id` -> récupère une recette

> La forme des objets reçus de l'API pour ces routes est la suivante :
> ```ts
> {
>   id: number,
>   titre: string,
>   instructions?: string // ce champ est optionnel : la route `GET /recettes` par exemple ne le renvoie pas
> }
> ```

 - `POST /recettes` -> crée une recette (retourne l'entité créée)

> La forme des objets attendus par l'API pour cette route est la suivante :
> ```ts
> {
>   titre: string,
>   instructions?: string // ce champ est optionnel : on peut créer une Recette uniquement avec un titre
> }
> ```

 - `PATCH /recettes/:recette_id` -> modifie une recette (retourne l'entité modifiée)

> La forme des objets attendus par l'API pour la modification d'une `Recette` est la même que pour la création, mais tous les champs sont optionnels.

 - `DELETE /recettes/:recette_id` -> supprime une recette

<hr />

Les routes suivantes permettent de gérer les associations entre les `Recettes` et les `Ingredients` :

 - `GET /recettes/:recette_id/ingredients` -> récupère tous les ingrédients d'une recette

> La forme des objets reçus de l'API pour cette route est la suivante :
> ```ts
> {
>   id: number,
>   nom: string,
>   unite: string,
>   quantite: number // on dispose ici de la quantité de l'ingrédient dans la recette
> }
> ```

 - `GET /ingredients/:ingredient_id/recettes` -> récupère toutes les recettes qui utilisent un ingrédient

> La forme des objets `Recette` reçus de l'API pour cette route est la même que pour la route `GET /recettes`, c'est-à-dire sans le champ `instructions`.

 - `POST /recettes/:recette_id/ingredients/:ingredient_id` -> associe un ingrédient à une recette

> La forme des objets attendus par l'API pour cette route est la suivante :
> ```ts
> {
>   quantite: number
> }
> ```

 - `DELETE /recettes/:recette_id/ingredients/:ingredient_id` -> dissocie un ingrédient d'une recette
