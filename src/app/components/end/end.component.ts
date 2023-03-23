import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {
  username: string = '';
  finalScore: number;

  constructor (private quizService: QuizService, private router: Router) {
    this.finalScore = this.quizService.getFinalScore();
  }

  ngOnInit(): void {}

  saveHighScore(): void{
    this.quizService.addPlayer(this.username);
    this.router.navigate(['/']);
  }
}
