import Question from "./Question";

interface QuestionsResponse {
    results_code: number,
    results: Question[]
}

export default QuestionsResponse;