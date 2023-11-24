import QuestionRow from "./question/QuestionRow";
import React, {useReducer} from "react";
import Question from "../model/Question";

interface QuizGameProps {
    questions: Question[]
    onSubmit: (answers: Map<Question, string>) => void
}

const selectAnswer = ((state: Map<Question, string>, action: {
    question: Question,
    answer: string
}) => new Map(state.set(action.question, action.answer)));

const QuizGame = ({questions, onSubmit}: QuizGameProps) => {
    const [selectedAnswers, dispatchAnswers] =
        useReducer(selectAnswer, new Map<Question, string>());

    const allAnswered: boolean = selectedAnswers.size === questions.length;

    return <div>
        {questions.map(q =>
            <QuestionRow key={q.question} question={q}
                         selectedAnswer={selectedAnswers.get(q)}
                         onAnswerSelected={(question, answer) => dispatchAnswers({
                             question,
                             answer
                         })}/>)
        }

        {allAnswered && <button onClick={() => onSubmit(selectedAnswers)}>Submit</button>}
    </div>
};

export default QuizGame;