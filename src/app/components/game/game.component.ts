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
  randomQuestion: Question = this.availableQuestions[Math.floor(Math.random() * this.availableQuestions.length)];

  constructor (private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(data => {
      this.availableQuestions = data;
      alert(data);
      alert(this.availableQuestions);
    });
  }
}