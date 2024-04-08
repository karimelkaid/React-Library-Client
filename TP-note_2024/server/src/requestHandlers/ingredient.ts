import { prisma } from '../db';
import { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';
import { HttpError } from '../error';
import { assert } from 'superstruct';
import { IngredientCreationData, IngredientUpdateData, IngredientGetAllQuery } from '../validation/ingredient';

export async function get_all(req: Request, res: Response) {
  assert(req.query, IngredientGetAllQuery);
  const { skip, take } = req.query;
  const ingredients = await prisma.ingredient.findMany({
    orderBy: { nom: 'asc' },
    skip: skip ? Number(skip) : undefined,
    take: take ? Number(take) : undefined
  });
  const ingredientCount = await prisma.ingredient.count();
  res.header('X-Total-Count', String(ingredientCount));
  res.json(ingredients);
};

export async function get_one(req: Request, res: Response) {
  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id: Number(req.params.ingredient_id)
    }
  });
  if (!ingredient) {
    throw new HttpError('Ingredient not found', 404);
  }
  res.json(ingredient);
};

export async function create_one(req: Request, res: Response) {
  assert(req.body, IngredientCreationData);
  const ingredient = await prisma.ingredient.create({
    data: req.body
  });
  res.status(201).json(ingredient);
};

export async function update_one(req: Request, res: Response) {
  assert(req.body, IngredientUpdateData);
  try {
    const ingredient = await prisma.ingredient.update({
      where: {
        id: Number(req.params.ingredient_id)
      },
      data: req.body
    });
    res.json(ingredient);
  }
  catch (err) {
    throw new HttpError('Ingredient not found', 404);
  }
};

export async function delete_one(req: Request, res: Response) {
  try {
    await prisma.ingredient.delete({
      where: {
        id: Number(req.params.ingredient_id)
      }
    });
    res.status(204).send();
  }
  catch (err) {
    throw new HttpError('Ingredient not found', 404);
  }
};
