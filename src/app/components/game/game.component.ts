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
      alert(this.availableQuestions[0].question);
    });
    
    if (this.availableQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.availableQuestions.length);
      this.randomQuestion = this.availableQuestions[randomIndex];
    }
    alert(this.randomQuestion.question);
  }
}