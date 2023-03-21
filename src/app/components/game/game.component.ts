import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from 'src/app/models/Question';
<<<<<<< HEAD
import { Choice } from 'src/app/models/Choice';
=======
>>>>>>> 00859b09ddc62147e5f0b435ef57f4e7a141e6b4

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
<<<<<<< HEAD
  prefixAsciiValue = 65; // A
  alphabet = String.fromCharCode(this.asciiValue); // Output: A

  availableQuestions: Question[] = [];
  randomQuestion: Question;
  choices: Choice[] = []
=======
  availableQuestions: Question[] = [];
  randomQuestion: Question;
  answers: string[] = []
>>>>>>> 00859b09ddc62147e5f0b435ef57f4e7a141e6b4

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

<<<<<<< HEAD
      const unFormattedChoices: string[] = [
        ...this.randomQuestion.incorrect_answers,
        this.randomQuestion.correct_answer
      ]

      for (let i = 0, n = unFormattedChoices.length; i < n; i++) {
        this.choices[i] = {
          choice: unFormattedChoices[i],
          prefix: this.alphabet,
          data_number:  i+1
        }

        this.prefixAsciiValue++;
      }
=======
      this.answers = [
        ...this.randomQuestion.incorrect_answers,
        this.randomQuestion.correct_answer
      ]
>>>>>>> 00859b09ddc62147e5f0b435ef57f4e7a141e6b4
    });
    
  }
}