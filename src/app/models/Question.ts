import { Choice } from './Choice';

export interface Question {
    category: string;
    difficulty: string;
    question: string;
    answer: number;
    choices: Choice[];
    correct_answer: string;
    incorrect_answers: string[];  

    // constructor () {
    //     this.category = '';
    //     this.difficulty = '';
    //     this.question = '';
    //     this.answer = 0;
    //     this.choices= [];
    //     this.correct_answer = '';
    //     this.incorrect_answers = [];
    // }
}