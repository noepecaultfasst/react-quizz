import './AnswerButton.css';

interface AnswerButtonProps {
    answer: string
    state: "correct" | "incorrect" | "default"
    onClick: () => void
}

const AnswerButton = ({answer, state, onClick}: AnswerButtonProps) => {
    return <button className={state} onClick={onClick} dangerouslySetInnerHTML={{__html: answer}}></button>
};

export default AnswerButton;