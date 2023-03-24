import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css']
})
export class HighScoresComponent implements OnInit {
  /* Getting all the players, sorting them from highest to lowest by score, then taking the top 5 only. */
  players: Player[] = this.quizService.getPlayers()
                      .sort((a: Player, b: Player) => b.score - a.score)
                      .slice(0, Math.min(5, this.quizService.getPlayers().length)); // Extract first 5 elements, or all elements if the array has less than 5 elements

  constructor (private quizService: QuizService) {}

  ngOnInit(): void {}
}
