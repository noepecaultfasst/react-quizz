import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import QuizGame from "./components/QuizGame/QuizGame";
import QuizResults from "./components/QuizResults/QuizResults";


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
        <div className="center">
            <div className="App">
                <h1>Quiz Maker</h1>
                <hr></hr>
                <RouterProvider router={router}/>
            </div>
        </div>

    );
}

export default App;
