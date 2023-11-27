import QuestionRow from "./question/QuestionRow";
import React from "react";
import Question from "../model/Question";
import {Link, useLocation} from "react-router-dom";
import './QuizResults.css';

const QuizResults = () => {
    const location = useLocation();

    const answers: Map<Question, string> = location.state;
    const questions: Question[] = [...answers.keys()];

    const correctAnswers = [...answers.entries()]
        .filter(([q, a]) => q.correct_answer === a);
    const score = correctAnswers.length;

    let scoreStyle: string;
    if (0 <= score && score <= 1) scoreStyle = "low-score";
    else if (2 <= score && score <= 3) scoreStyle = "medium-score";
    else scoreStyle = "high-score";

    return (
        <>
            <h1>Results</h1>
            {
                questions.map(q => <QuestionRow reveal={true} key={q.question} question={q}
                                                selectedAnswer={answers.get(q)}/>)
            }

            <p className={scoreStyle}>You scored {score} out of {questions.length}</p>
            <Link to="/">
                <button>Create a new game</button>
            </Link>
        </>);
};

export default QuizResults;