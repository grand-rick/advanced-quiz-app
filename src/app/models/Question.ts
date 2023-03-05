export class Question {
    category: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];

    constructor () {
        this.category = '';
        this.difficulty = '';
        this.question = '';
        this.correct_answer = '';
        this.incorrect_answers = ['', '', '', ''];
    }
}