import {prisma} from '../db';
import {Prisma} from '@prisma/client';
import type {Request, Response} from 'express';
import {HttpError} from '../error';
import {assert} from 'superstruct';
import {BookCreationData, BookUpdateData} from '../validation/book';

export async function get_all(req: Request, res: Response) {
    const {title, include, skip, take} = req.query;
    const filter: Prisma.BookWhereInput = {};
    if (title) {
        filter.title = {contains: String(title)};
    }
    const assoc: Prisma.BookInclude = {};
    if (include === 'author') {
        assoc.author = {select: {id: true, firstname: true, lastname: true}};
    }
    const books = await prisma.book.findMany({
        where: filter,
        include: assoc,
        orderBy: {title: 'asc'},
        skip: skip ? Number(skip) : undefined,
        take: take ? Number(take) : undefined
    });
    const bookCount = await prisma.book.count({where: filter});
    res.header('X-Total-Count', String(bookCount));
    res.json(books);
};

export async function get_one(req: Request, res: Response) {
    const book = await prisma.book.findUnique({
        where: {
            id: Number(req.params.book_id)
        }
    });
    if (!book) {
        throw new HttpError('Book not found', 404);
    }
    res.json(book);
};

export async function get_all_of_author(req: Request, res: Response) {
    const {title} = req.query;
    const filter: Prisma.BookWhereInput = {};
    if (title) {
        filter.title = {contains: String(title)};
    }
    const author = await prisma.author.findUnique({
        where: {
            id: Number(req.params.author_id),
        },
        include: {
            books: {
                where: filter,
            }
        }
    });
    if (!author) {
        throw new HttpError('Author not found', 404);
    }
    res.json(author.books);
};

export async function create_one_of_author(req: Request, res: Response) {
    assert(req.body, BookCreationData); // Assurez-vous que les données de la requête sont conformes au type BookCreationData

    const {title, publication_year, rating} = req.body; // Extrayez les données du corps de la requête
    const authorId = Number(req.params.author_id);

    try {
        const book = await prisma.book.create({
            data: {
                title,
                publication_year,
                rating,
                author: {
                    connect: {
                        id: authorId
                    }
                }
            }
        });
        res.status(201).json(book);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({error: "Failed to create book for author"});
    }
}


export async function update_one(req: Request, res: Response) {
    try {
        const book = await prisma.book.update({
            where: {
                id: Number(req.params.book_id)
            },
            data: req.body
        });
        res.json(book);
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ error: 'Failed to update book' });
    }
}

export async function delete_one(req: Request, res: Response) {
    try {
        await prisma.book.delete({
            where: {
                id: Number(req.params.book_id)
            }
        });
        res.status(204).send();
    } catch (err) {
        throw new HttpError('Book not found', 404);
    }
};
