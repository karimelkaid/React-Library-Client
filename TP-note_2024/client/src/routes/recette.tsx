import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Le composant Recette charge et affiche les informations de la recette
// dont l'identifiant est extrait de la route courante.

export default function Recette() {
  return <div>
    <h3>Ingrédient : </h3>
    {
      // ====
      // TODO: afficher les informations de la recette
      // ====
    }
    <IngredientsRecette />
  </div>;
}

// Le composant IngredientsRecette charge et affiche la liste des ingrédients
// utilisés par la recette dont l'identifiant est extrait de la route courante.
// Il permet également l'ajout et la suppression d'ingrédients associés à la recette.

function IngredientsRecette() {
  return <>
    <h4>Ingrédients</h4>
  </>;
}
