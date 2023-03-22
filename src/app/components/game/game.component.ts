import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from 'src/app/models/Question';
import { rawQuestion } from 'src/app/models/rawQuestion';
import { Choice } from 'src/app/models/Choice';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  questions: Question[] = [];
  randomQuestion: Question;

  // availableQuestions: = [];
  
  // currentQuestion = {};
  // acceptingAnswers = false;
  // score = 0;
  // questionCounter = 0;

  constructor (private quizService: QuizService) {
      this.randomQuestion = {
        category: '',
        difficulty: '',
        question: '',
        answer: 0,
        choices: []
      }
    }

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(data => {
      let loadedQuestions: rawQuestion[] = data;

      this.questions = this.questionsFormatter(loadedQuestions);

      // Change to available questions later
      if (this.questions.length) {
        const randomIndex: number = Math.floor(Math.random() * this.questions.length);
        this.randomQuestion = this.questions[randomIndex];
      }

    });
  }

  choiceFormatter(choice: string, index: number): Choice {
    let prefixAsciiValue = 65; // A

    let formattedChoice = {
        prefix: String.fromCharCode(prefixAsciiValue + index),
        choice,
        data_number:  index+1
      }

    return formattedChoice;
  }
  
  questionsFormatter(loadedQuestions: rawQuestion[]): Question[] {
    let neatQuestions: Question[] = [];
    
    loadedQuestions.forEach((loadedQuestion: rawQuestion) => {
      const formattedQuestion = {
        category: loadedQuestion.category,
        difficulty: loadedQuestion.difficulty,
        question: loadedQuestion.question,
        correct_answer: loadedQuestion.correct_answer,
        incorrect_answers: loadedQuestion.incorrect_answers,
        answer: 0,
        choices: []
      };

      const answerChoices: string[] = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      // Add the correct answer to the index with the answer value
      answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

      answerChoices.forEach((choice, index) => {
        // Formatting each choice
        formattedQuestion.choices[index] = this.choiceFormatter(choice, index);
      });

      neatQuestions.push(formattedQuestion);
    });

    return neatQuestions;
  }
}