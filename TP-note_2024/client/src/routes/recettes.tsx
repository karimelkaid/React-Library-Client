import { useState, useEffect } from "react";
import { Outlet, NavLink, useParams, useNavigate } from "react-router-dom";


// Le composant Recettes charge et affiche la liste des recettes.
// Il permet également l'ajout et la suppression de recettes.

export default function Recettes() {



  return (
    <div id="container">
      <div id="sidebar">
        {
          // ====
          // TODO: formulaire d'ajout de recette
          // ====
        }
        <hr />
        <ul>
          {
            // ====
            // TODO: afficher la liste des recettes
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
