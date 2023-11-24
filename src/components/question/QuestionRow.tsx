import Question from "../../model/Question";
import {useMemo} from "react";
import AnswerButton from "./AnswerButton";

interface QuestionProps {
    question: Question
    selectedAnswer: string | undefined
    onAnswerSelected?: (question: Question, answer: string) => void
    reveal?: boolean
}

const QuestionRow = ({selectedAnswer, question, onAnswerSelected, reveal = false}: QuestionProps) => {
    const answers: string[] = useMemo(() =>
            [question.correct_answer, ...question.incorrect_answers].sort(() => 0.5 - Math.random()),
        [question]);

    const getState = ((answer: string) => {
        const selected = answer === selectedAnswer;
        if (reveal) {
            if (answer === question.correct_answer) {
                return 'correct';
            } else if(selected) {
                return 'incorrect';
            } else {
                return 'default';
            }
        } else if(selected) {
            return 'correct';
        } else {
            return 'default';
        }
    });

    return (
        <div>
            <h2 dangerouslySetInnerHTML={{__html: question.question}}/>
            <div>
                {
                    answers.map(answer =>
                        <AnswerButton key={answer} answer={answer} onClick={() => {
                            onAnswerSelected && onAnswerSelected(question, answer)
                        }} state={getState(answer)}/>
                    )
                }
            </div>
        </div>
    );
};

export default QuestionRow;