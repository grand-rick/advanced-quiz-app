import { Component, OnInit, Renderer2 } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from 'src/app/models/Question';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  availableQuestions: Question[] = [];

  //CONSTANTS
  CORRECT_BONUS = 10;
  MAX_QUESTIONS = 3;

  constructor (private renderer: Renderer2, private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(data => {
      this.availableQuestions = data;
    })
  }
}