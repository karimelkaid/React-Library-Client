import { prisma } from '../db';
import { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';
import { HttpError } from '../error';
import { assert } from 'superstruct';
import { AuthorCreationData, AuthorUpdateData, AuthorGetAllQuery } from '../validation/author';

export async function get_all(req: Request, res: Response) {
  assert(req.query, AuthorGetAllQuery);
  const { lastname, hasBooks, include, skip, take } = req.query;
  const filter: Prisma.AuthorWhereInput = {};
  if (lastname) {
    filter.lastname = { contains: String(lastname) };
  }
  if (hasBooks === 'true') {
    filter.books = { some: {} };
  }
  const assoc: Prisma.AuthorInclude = {};
  if (include === 'books') {
    assoc.books = { select: { id: true, title: true }, orderBy: { title: 'asc' } };
  }
  const authors = await prisma.author.findMany({
    where: filter,
    include: assoc,
    orderBy: { lastname: 'asc' },
    skip: skip ? Number(skip) : undefined,
    take: take ? Number(take) : undefined
  });
  const authorCount = await prisma.author.count({ where: filter });
  res.header('X-Total-Count', String(authorCount));
  res.json(authors);
};

export async function get_one(req: Request, res: Response) {
  const author = await prisma.author.findUnique({
    where: {
      id: Number(req.params.author_id)
    }
  });
  if (!author) {
    throw new HttpError('Author not found', 404);
  }
  res.json(author);
};

export async function create_one(req: Request, res: Response) {
  assert(req.body, AuthorCreationData);
  const author = await prisma.author.create({
    data: req.body
  });
  res.status(201).json(author);
};

export async function update_one(req: Request, res: Response) {
  assert(req.body, AuthorUpdateData);
  try {
    const author = await prisma.author.update({
      where: {
        id: Number(req.params.author_id)
      },
      data: req.body
    });
    res.json(author);
  }
  catch (err) {
    throw new HttpError('Author not found', 404);
  }
};

export async function delete_one(req: Request, res: Response) {
  try {
    await prisma.author.delete({
      where: {
        id: Number(req.params.author_id)
      }
    });
    res.status(204).send();
  }
  catch (err) {
    throw new HttpError('Author not found', 404);
  }
};
