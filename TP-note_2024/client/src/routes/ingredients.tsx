import { useState, useEffect } from "react";
import { Outlet, NavLink, useParams, useNavigate } from "react-router-dom";

import type { Ingredient } from "../types";

import { get_ingredients } from "../api";

// Le composant Ingredients charge et affiche la liste des ingrédients.
// Il permet également l'ajout et la suppression d'ingrédients.

export default function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIngredients();
  }, []);

  async function loadIngredients() {
    // ====
    // TODO: charger la liste des ingrédients
    // ====
  }

  return (
    <div id="container">
      <div id="sidebar">
        {
          // ====
          // TODO: formulaire d'ajout d'ingrédient
          // ====
        }
        <hr />
        <ul>
          {
            // ====
            // TODO: afficher la liste des ingrédients
            // ====
          }
        </ul>
      </div>
      <div id="info">
        <Outlet />
      </div>
    </div>
  );
}
