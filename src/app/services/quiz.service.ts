import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/Question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  // questions: Question[] = [];
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
}
