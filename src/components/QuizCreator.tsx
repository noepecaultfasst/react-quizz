import OptionSelector from "./OptionSelector";
import React, {useState} from "react";
import Category from "../model/Category";
import Difficulty from "../model/Difficulty";
import Question from "../model/Question";
import QuestionsResponse from "../model/QuestionsReponse";

interface QuizCreatorProps {
    categories: Category[]
    difficulties: Difficulty[]
    onQuestionsReceived: (questions: Question[]) => void
}

const QuizCreator = ({categories, difficulties, onQuestionsReceived}: QuizCreatorProps) => {
    let [selectedCategoryId, setSelectedCategoryId] = useState<number>();
    let [selectedDifficultyId, setSelectedDifficultyId] = useState<string>();

    let selectedCategory = selectedCategoryId ? categories.find(c => c.id === selectedCategoryId) : undefined;
    let selectedDifficulty = selectedDifficultyId ? difficulties.find(d => d.id === selectedDifficultyId) : undefined;

    const fetchQuestions = async (category: Category, difficulty: Difficulty, amount = 5) => {
        fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category.id}&difficulty=${difficulty.id}&type=multiple`)
            .then(response => response.json() as Promise<QuestionsResponse>)
            .then(response => response.results)
            .then(onQuestionsReceived);
    };

    return <div>
        <OptionSelector options={categories} value={selectedCategory}
                        id="categorySelect"
                        onOptionSelected={(o) => setSelectedCategoryId(o as number)}
                        defaultLabel="Select a category"/>

        <OptionSelector defaultLabel="Select a difficulty" options={difficulties}
                        id="difficultySelect"
                        onOptionSelected={(o) => setSelectedDifficultyId(o as string)}/>
        <button id="createBtn"
                onClick={() => selectedCategory && selectedDifficulty && fetchQuestions(selectedCategory, selectedDifficulty)}>Create
        </button>
    </div>;
}

export default QuizCreator;