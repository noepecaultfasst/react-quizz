import React, {useEffect, useState} from 'react';
import './App.css';
import Category from "./model/Category";
import CategoriesResponse from "./model/CategoriesResponse";
import Difficulty from "./model/Difficulty";
import Question from "./model/Question";
import QuizCreator from "./components/QuizCreator";
import QuizGame from "./components/QuizGame";

const difficulties: Difficulty[] = [
    {id: "easy", name: "Easy"},
    {id: "medium", name: "Medium"},
    {id: "hard", name: "Hard"},
]

function App() {
    let [categories, setCategories] = useState<Category[]>([]);
    let [questions, setQuestions] = useState<Question[]>();

    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then(response => response.json() as Promise<CategoriesResponse>)
            .then(categoriesResponse => categoriesResponse.trivia_categories)
            .then(cat => setCategories(cat));
    }, []);

    return (
        <div className="App">
            <QuizCreator categories={categories} difficulties={difficulties} onQuestionsReceived={setQuestions}/>
            <div>
                {questions && <QuizGame questions={questions} onSubmit={(answers => console.log(answers))}/>}
            </div>
        </div>
    );
}

export default App;
