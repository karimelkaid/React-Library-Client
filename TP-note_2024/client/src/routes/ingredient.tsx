import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Le composant Ingredient charge et affiche les informations de l'ingrédient
// dont l'identifiant est extrait de la route courante.

export default function Ingredient() {
  return <div>
    <h3>Ingrédient : </h3>
    {
      // ====
      // TODO: afficher les informations de l'ingrédient
      // ====
    }
    <RecettesIngredient />
  </div>;
}

// Le composant RecettesIngredient charge et affiche la liste des recettes
// contenant l'ingrédient dont l'identifiant est extrait de la route courante.

function RecettesIngredient() {
  return <>
    <h4>Recettes</h4>
  </>;
}
