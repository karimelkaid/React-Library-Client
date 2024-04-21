import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Root from "./routes/root.tsx";
import Authors from "./components/authors.tsx";
import Books from "./components/books.tsx";
import Author from "./components/author.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: (
                    <p>Bienvenue sur le site de gestion de la bibliothèque.</p>
                )
            },
            {
                path: "authors",
                element: <Authors />,
                children: [
                    {
                        path: "",
                        element: <p>Choisissez un auteur pour voir ses informations.</p>
                    },
                    {
                        path: ":authorId",
                        element: <Author />
                    }
                ]
            },
            {
                path: "books",
                element: <Books />
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
