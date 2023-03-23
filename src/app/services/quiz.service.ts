import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/Question';
import { Player } from 'src/app/models/Player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  // questions: Question[] = [];
  players: Player[] = [];
  score: number = 0;

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('assets/data.json');
  }

  setMostRecentScore(score: number): number {
    this.score = score;
    return this.score;
  }

  getFinalScore(): number {
    return this.score;
  }

  getPlayers(): Player[] {
    return this.players;
  }

  addPlayer(name: string): Player[] {
    const playerIndex = this.players.findIndex((player) => player.name === name);

    // If the player already Exists update the score otherwise add them to the list
    if (playerIndex !== -1) {
      this.players[playerIndex].score = this.score;
      return this.players;
    } else {
      const newPlayer: Player = {
        name,
        score: this.score
      }
      
      this.players.push(newPlayer);
    }
    
    return this.players;
  }
}
