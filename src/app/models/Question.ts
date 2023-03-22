import { Choice } from './Choice';

export interface Question {
    category: string;
    difficulty: string;
    question: string;
    answer: number;
    choices: Choice[];
    correct_answer: string;
    incorrect_answers: string[];  
}