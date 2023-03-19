import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from 'src/app/models/Question';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  availableQuestions: Question[] = [];
  randomQuestion: Question;
  answers: string[] = []

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

      this.answers = [
        ...this.randomQuestion.incorrect_answers,
        this.randomQuestion.correct_answer
      ]
    });
    
  }
}