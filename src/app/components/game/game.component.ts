import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from 'src/app/models/Question';
import { Choice } from 'src/app/models/Choice';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  prefixAsciiValue = 65; // A

  availableQuestions: Question[] = [];
  randomQuestion: Question;
  choices: Choice[] = []

  constructor (private quizService: QuizService) {
      this.randomQuestion = {
        category: '',
        difficulty: '',
        question: '',
        correct_answer: '',
        incorrect_answers: ['', '', '', '']
      }
    }

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(data => {
      this.availableQuestions = data;
      if (this.availableQuestions.length) {
        const randomIndex: number = Math.floor(Math.random() * this.availableQuestions.length);
        this.randomQuestion = this.availableQuestions[randomIndex];
      }

      const unFormattedChoices: string[] = [
        ...this.randomQuestion.incorrect_answers,
        this.randomQuestion.correct_answer
      ]

      this.choiceHandler(unFormattedChoices);
    });
  }

  choiceHandler(unFormattedChoices: string[]): void {
    for (let i = 0, n = unFormattedChoices.length; i < n; i++) {
      this.choices[i] = {
        choice: unFormattedChoices[i],
        prefix: String.fromCharCode(this.prefixAsciiValue),
        data_number:  i+1
      }
      this.prefixAsciiValue++;
    }
  }
  
}