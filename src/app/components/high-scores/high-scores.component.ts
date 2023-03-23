import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css']
})
export class HighScoresComponent implements OnInit {
  players: Player[] = this.quizService.getPlayers();

  constructor (private quizService: QuizService) {}

  ngOnInit(): void {}
}
