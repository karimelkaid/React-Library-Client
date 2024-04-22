import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Root from "./routes/root.tsx";
import Authors from "./components/authors.tsx";
import Books from "./components/books.tsx";
import Author from "./components/author.tsx";
import Book from "./components/book.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: (
                    <p>Welcome to the library! Use the navigation bar to browse the authors and books.</p>
                )
            },
            {
                path: "authors",
                element: <Authors />,
                children: [
                    {
                        path: "",
                        element: <p>Choose an author to see its details.</p>
                    },
                    {
                        path: ":authorId",
                        element: <Author />
                    }
                ]
            },
            {
                path: "books",
                element: <Books />,
                children: [
                    {
                        path: "",
                        element: <p>Choose a book to see its details.</p>
                    },
                    {
                        path: ":bookId",
                        element: <Book />
                    }
                ]
            }
        ]
    },
    {
        path: "about",
        element: <div>About</div>,
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root')
);
