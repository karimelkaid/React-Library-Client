import { prisma } from '../db';
import type { Request, Response } from 'express';
import { HttpError } from '../error';
import { assert } from 'superstruct';
import { TagCreationData, TagUpdateData } from '../validation/tag';

export async function get_all(req: Request, res: Response) {
  const tags = await prisma.tag.findMany();
  res.json(tags);
};

export async function get_one(req: Request, res: Response) {
  const tag = await prisma.tag.findUnique({
    where: {
      id: Number(req.params.tag_id)
    }
  });
  if (!tag) {
    throw new HttpError('Tag not found', 404);
  }
  res.json(tag);
};

export async function get_all_of_book(req: Request, res: Response) {
  const book = await prisma.book.findUnique({
    where: {
      id: Number(req.params.book_id)
    },
    include: {
      tags: true
    }
  });
  if (!book) {
    throw new HttpError('Book not found', 404);
  }
  res.json(book.tags);
};

export async function create_one(req: Request, res: Response) {
  assert(req.body, TagCreationData);
  const tag = await prisma.tag.create({
    data: req.body
  });
  res.status(201).json(tag);
};

export async function update_one(req: Request, res: Response) {
  assert(req.body, TagUpdateData);
  try {
    const tag = await prisma.tag.update({
      where: {
        id: Number(req.params.tag_id)
      },
      data: req.body
    });
    res.json(tag);
  }
  catch (err) {
    throw new HttpError('Tag not found', 404);
  }
};

export async function delete_one(req: Request, res: Response) {
  try {
    await prisma.tag.delete({
      where: {
        id: Number(req.params.tag_id)
      }
    });
    res.status(204).send();
  }
  catch (err) {
    throw new HttpError('Tag not found', 404);
  }
};

export async function add_one_to_book(req: Request, res: Response) {
  await prisma.tag.update({
    where: {
      id: Number(req.params.tag_id)
    },
    data: {
      books: {
        connect: {
          id: Number(req.params.book_id)
        }
      }
    }
  });
  res.status(204).send();
};

export async function remove_one_from_book(req: Request, res: Response) {
  await prisma.tag.update({
    where: {
      id: Number(req.params.tag_id)
    },
    data: {
      books: {
        disconnect: {
          id: Number(req.params.book_id)
        }
      }
    }
  });
  res.status(204).send();
};
