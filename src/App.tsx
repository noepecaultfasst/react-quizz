import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import QuizGame from "./components/QuizGame";
import QuizResults from "./components/QuizResults";


const router = createBrowserRouter([
    {
        path: "/",
        element: <QuizGame/>
    },
    {
        path: "/results",
        element: <QuizResults/>
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
