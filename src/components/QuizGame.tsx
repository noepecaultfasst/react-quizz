import QuestionRow from "./question/QuestionRow";
import React, {useEffect, useReducer, useState} from "react";
import Question from "../model/Question";
import Category from "../model/Category";
import CategoriesResponse from "../model/CategoriesResponse";
import QuizCreator from "./QuizCreator";
import Difficulty from "../model/Difficulty";
import {useNavigate} from "react-router-dom";

const difficulties: Difficulty[] = [
    {id: "easy", name: "Easy"},
    {id: "medium", name: "Medium"},
    {id: "hard", name: "Hard"},
]

const selectAnswer = ((state: Map<Question, string>, action: {
    question: Question,
    answer: string
}) => new Map(state.set(action.question, action.answer)));

const QuizGame = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [questions, setQuestions] = useState<Question[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then(response => response.json() as Promise<CategoriesResponse>)
            .then(categoriesResponse => categoriesResponse.trivia_categories)
            .then(cat => setCategories(cat));
    }, []);

    const [selectedAnswers, dispatchAnswers] =
        useReducer(selectAnswer, new Map<Question, string>());

    const allAnswered: boolean = questions !== undefined && (selectedAnswers.size === questions.length);

    return <div>
        <QuizCreator categories={categories} difficulties={difficulties} onQuestionsReceived={setQuestions}/>
        <div>
            {questions && <div>
                {questions.map(q =>
                    <QuestionRow key={q.question} question={q}
                                 selectedAnswer={selectedAnswers.get(q)}
                                 onAnswerSelected={(question, answer) => dispatchAnswers({
                                     question,
                                     answer
                                 })}/>)
                }

                {allAnswered && <button onClick={() => navigate("/results", {state: selectedAnswers})}>Submit</button>}
            </div>}
        </div>
    </div>
};

export default QuizGame;