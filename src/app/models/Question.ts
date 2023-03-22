import { Choice } from './Choice';

export class Question {
    category: string;
    difficulty: string;
    question: string;
    answer: number
    choices: Choice[4]

    constructor () {
        this.category = '';
        this.difficulty = '';
        this.question = '';
        this.answer = 0;
        this.choices= [];
    }
}