import express, {NextFunction, Request, Response} from 'express';
import {HttpError} from './error';
import {StructError} from 'superstruct';

import * as author from './requestHandlers/author';
import * as book from './requestHandlers/book';
import * as tag from './requestHandlers/tag';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    next();
});

app.get('/authors', author.get_all);
app.get('/authors/:author_id', author.get_one);
app.post('/authors', author.create_one);
app.patch('/authors/:author_id', author.update_one);
app.delete('/authors/:author_id', author.delete_one);

app.get('/books', book.get_all);
app.get('/books/:book_id', book.get_one);
app.get('/authors/:author_id/books', book.get_all_of_author);
app.post('/authors/:author_id/books', book.create_one_of_author);
app.patch('/books/:book_id', book.update_one);
app.delete('/books/:book_id', book.delete_one);

app.get('/tags', tag.get_all);
app.get('/tags/:tag_id', tag.get_one);
app.get('/books/:book_id/tags', tag.get_all_of_book);
app.post('/tags', tag.create_one);
app.patch('/tags/:tag_id', tag.update_one);
app.delete('/tags/:tag_id', tag.delete_one);
app.post('/books/:book_id/tags/:tag_id', tag.add_one_to_book);
app.delete('/books/:book_id/tags/:tag_id', tag.remove_one_from_book);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    next();

    if (err instanceof StructError) {
        err.status = 400;
        err.message = `Bad value for field ${err.key}`;
    }
    return res.status(err.status ?? 500).send(err.message);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
