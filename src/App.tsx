import React, {useEffect, useState} from 'react';
import './App.css';
import OptionSelector from "./components/OptionSelector";
import TriviaCategory from "./model/TriviaCategory";
import CategoriesResponse from "./model/CategoriesResponse";

const difficulties = [
    {id: "easy", name: "Easy"},
    {id: "medium", name: "Medium"},
    {id: "hard", name: "Hard"},
]

function App() {
    let [categories, setCategories] = useState<TriviaCategory[]>([]);
    let [selectedCategoryId, setSelectedCategoryId] = useState<number>();
    let [selectedDifficultyId, setSelectedDifficultyId] = useState<string>();

    let selectedCategory = selectedCategoryId ? categories.find(c => c.id === selectedCategoryId) : undefined;
    let selectedDifficulty = selectedDifficultyId ? difficulties.find(d => d.id === selectedDifficultyId) : undefined;

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(response => response.json() as Promise<CategoriesResponse>)
            .then(categoriesResponse => categoriesResponse.trivia_categories)
            .then(cat => setCategories(cat));
    }, []);


    return (
        <div className="App">
            <div className="">
                <OptionSelector options={categories} value={selectedCategory}
                                onOptionSelected={(o) => setSelectedCategoryId(o as number)}
                                defaultLabel="Select a category"/>

                <OptionSelector defaultLabel="Select a difficulty" options={difficulties}
                                onOptionSelected={(o) => setSelectedDifficultyId(o as string)}/>
            </div>
        </div>
    );
}

export default App;
