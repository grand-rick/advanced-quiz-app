import { Injectable } from '@angular/core';
import { Question } from '../models/Question';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // questions: Question[] = [];

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('assets/data.json');
  }
}
