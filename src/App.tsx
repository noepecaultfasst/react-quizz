import React, {useEffect, useState} from 'react';
import './App.css';
import OptionSelector from "./components/OptionSelector";
import Category from "./model/Category";
import CategoriesResponse from "./model/CategoriesResponse";
import Difficulty from "./model/Difficulty";
import Question from "./model/Question";
import QuestionsResponse from "./model/QuestionsReponse";

const difficulties: Difficulty[] = [
    {id: "easy", name: "Easy"},
    {id: "medium", name: "Medium"},
    {id: "hard", name: "Hard"},
]

function App() {
    let [categories, setCategories] = useState<Category[]>([]);
    let [selectedCategoryId, setSelectedCategoryId] = useState<number>();
    let [selectedDifficultyId, setSelectedDifficultyId] = useState<string>();

    let [questions, setQuestions] = useState<Question[]>([]);

    let selectedCategory = selectedCategoryId ? categories.find(c => c.id === selectedCategoryId) : undefined;
    let selectedDifficulty = selectedDifficultyId ? difficulties.find(d => d.id === selectedDifficultyId) : undefined;

    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then(response => response.json() as Promise<CategoriesResponse>)
            .then(categoriesResponse => categoriesResponse.trivia_categories)
            .then(cat => setCategories(cat));
    }, []);

    const createQuiz = async (category: Category, difficulty: Difficulty, amount = 5) => {
        fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category.id}&difficulty=${difficulty.id}&type=multiple`)
            .then(response => response.json() as Promise<QuestionsResponse>)
            .then(response => response.results)
            .then(setQuestions);
    };

    return (
        <div className="App">
            <div>
                <OptionSelector options={categories} value={selectedCategory}
                                id="categorySelect"
                                onOptionSelected={(o) => setSelectedCategoryId(o as number)}
                                defaultLabel="Select a category"/>

                <OptionSelector defaultLabel="Select a difficulty" options={difficulties}
                                id="difficultySelect"
                                onOptionSelected={(o) => setSelectedDifficultyId(o as string)}/>
                <button id="createBtn"
                        onClick={() => selectedCategory && selectedDifficulty && createQuiz(selectedCategory, selectedDifficulty)}>Create
                </button>
            </div>
            <div>
                {questions.map(q => <p key={q.question} dangerouslySetInnerHTML={{__html: q.question}}></p>)}
            </div>
        </div>
    );
}

export default App;
