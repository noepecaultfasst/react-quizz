interface Question {
    "difficulty": string,
    "category": string,
    "question": string,
    "correct_answer": string,
    "incorrect_answers": string[],
    "answers": string[]
}

export default Question;