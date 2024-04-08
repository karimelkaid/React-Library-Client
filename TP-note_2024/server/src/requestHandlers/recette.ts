import { prisma } from '../db';
import { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';
import { HttpError } from '../error';
import { assert } from 'superstruct';
import { RecetteCreationData, RecetteUpdateData, RecetteGetAllQuery } from '../validation/recette';

export async function get_all(req: Request, res: Response) {
  assert(req.query, RecetteGetAllQuery);
  const { skip, take } = req.query;
  const recettes = await prisma.recette.findMany({
    orderBy: { titre: 'asc' },
    skip: skip ? Number(skip) : undefined,
    take: take ? Number(take) : undefined
  });
  const recetteCount = await prisma.recette.count();
  res.header('X-Total-Count', String(recetteCount));
  res.json(recettes);
};

export async function get_one(req: Request, res: Response) {
  const recette = await prisma.recette.findUnique({
    where: {
      id: Number(req.params.recette_id)
    }
  });
  if (!recette) {
    throw new HttpError('Recette not found', 404);
  }
  res.json(recette);
};

export async function create_one(req: Request, res: Response) {
  assert(req.body, RecetteCreationData);
  const recette = await prisma.recette.create({
    data: req.body
  });
  res.status(201).json(recette);
};

export async function update_one(req: Request, res: Response) {
  assert(req.body, RecetteUpdateData);
  try {
    const recette = await prisma.recette.update({
      where: {
        id: Number(req.params.recette_id)
      },
      data: req.body
    });
    res.json(recette);
  }
  catch (err) {
    throw new HttpError('Recette not found', 404);
  }
};

export async function delete_one(req: Request, res: Response) {
  try {
    await prisma.recette.delete({
      where: {
        id: Number(req.params.recette_id)
      }
    });
    res.status(204).send();
  }
  catch (err) {
    throw new HttpError('Recette not found', 404);
  }
};
