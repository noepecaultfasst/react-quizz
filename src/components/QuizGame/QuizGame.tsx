import QuestionRow from "../QuestionRow/QuestionRow";
import React, {useEffect, useReducer, useState} from "react";
import Question from "../../model/Question";
import Category from "../../model/Category";
import CategoriesResponse from "../../model/CategoriesResponse";
import QuizCreator from "../QuizCreator/QuizCreator";
import Difficulty from "../../model/Difficulty";
import {useNavigate} from "react-router-dom";

import './QuizGame.css';

const difficulties: Difficulty[] = [
    {id: "easy", name: "Easy"},
    {id: "medium", name: "Medium"},
    {id: "hard", name: "Hard"},
]

type Answer = {
    question: Question
    answer: string
}
type ResetAnswers = { questions: Question[] }
type NoAnswer = undefined

const selectAnswer = ((state: Map<Question, string | NoAnswer>, action: Answer | ResetAnswers) => {
    if (action.hasOwnProperty("questions")) {
        action = action as ResetAnswers
        return new Map<Question, string | NoAnswer>(action.questions.map(q => [q, undefined]));
    } else {
        action = action as Answer
        return new Map<Question, string | NoAnswer>(state.set(action.question, action.answer));
    }
});

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
        useReducer(selectAnswer, new Map<Question, string | NoAnswer>());

    const allAnswered: boolean =
        questions !== undefined &&
        ([...selectedAnswers.entries()]
            .filter(([, answer]) => answer !== undefined).length === questions.length);

    return <div className="game">
        <QuizCreator categories={categories} difficulties={difficulties} onQuestionsReceived={questions => {
            setQuestions(questions);
            dispatchAnswers({questions: questions})
        }}/>
        <div>
            {questions && <div>
                {questions.map(q =>
                    <QuestionRow key={q.question} question={q}
                                 selectedAnswer={selectedAnswers.get(q)}
                                 onAnswerSelected={(question, answer) => dispatchAnswers({
                                     question: question,
                                     answer: answer
                                 })}/>)
                }

                {allAnswered && <button id="submitBtn" onClick={() => navigate("/results", {state: selectedAnswers})}>Submit</button>}
            </div>}
        </div>
    </div>
};

export default QuizGame;