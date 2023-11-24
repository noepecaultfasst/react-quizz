import Question from "../../model/Question";
import {useMemo, useState} from "react";
import AnswerButton from "./AnswerButton";

interface QuestionProps {
    question: Question
    onAnswerSelected: (answer: string) => void
}

const QuestionRow = ({question}: QuestionProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string>();

    const answers: string[] = useMemo(() =>
            [question.correct_answer, ...question.incorrect_answers].sort(() => 0.5 - Math.random()),
        [question]);

    return (
        <div>
            <h2 dangerouslySetInnerHTML={{__html: question.question}}/>
            <div>{answers.map(answer => <AnswerButton key={answer} answer={answer} onClick={() => {}} state="default"/>)}</div>
        </div>
    );
};

export default QuestionRow;