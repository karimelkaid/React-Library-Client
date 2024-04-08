import { prisma } from '../db';
import { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';
import { HttpError } from '../error';
import { assert } from 'superstruct';
import { IngredientRecetteCreationData } from '../validation/ingredientRecette';

export async function ingredients_of_recette(req: Request, res: Response) {
  const recette = await prisma.recette.findUnique({
    where: {
      id: Number(req.params.recette_id)
    },
    include: {
      ingredients: { include: { ingredient: true } }
    }
  });
  if (!recette) {
    throw new HttpError('Recette not found', 404);
  }
  const result = recette.ingredients
    .map((ing) => ({ quantite: ing.quantite, ...ing.ingredient }))
    .sort((a, b) => a.nom.localeCompare(b.nom));
  res.json(result);
}

export async function recettes_of_ingredient(req: Request, res: Response) {
  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id: Number(req.params.ingredient_id)
    },
    include: {
      recettes: { include: { recette: { select: { id: true, titre: true } } } }
    }
  });
  if (!ingredient) {
    throw new HttpError('Ingredient not found', 404);
  }
  const result = ingredient.recettes
    .map((rec) => rec.recette)
    .sort((a, b) => a.titre.localeCompare(b.titre));
  res.json(result);
}

export async function add_ingredient_to_recette(req: Request, res: Response) {
  assert(req.body, IngredientRecetteCreationData);
  const ingRec = await prisma.ingredientRecette.create({
    data: {
      ...req.body,
      ingredient: {
        connect: { id: Number(req.params.ingredient_id) }
      },
      recette: {
        connect: { id: Number(req.params.recette_id) }
      }
    }
  });
  res.status(201).send();
}

export async function remove_ingredient_from_recette(req: Request, res: Response) {
  try {
    await prisma.ingredientRecette.delete({
      where: {
        ingredientId_recetteId: {
          ingredientId: Number(req.params.ingredient_id),
          recetteId: Number(req.params.recette_id)
        }
      }
    });
    res.status(204).send();
  }
  catch (err) {
    throw new HttpError('Ingredient not found in Recette', 404);
  }
}
