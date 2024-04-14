import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Root from "./routes/root.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: (
                    <p>Bienvenue sur notre site : Choisissez une catégorie.</p>
                )
            },
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
