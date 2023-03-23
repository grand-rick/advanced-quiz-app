import { Component, OnInit, Renderer2, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from 'src/app/models/Question';
import { rawQuestion } from 'src/app/models/rawQuestion';
import { Choice } from 'src/app/models/Choice';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  questions: Question[] = [];
  availableQuestions: Question[] = [];
  currentQuestion: Question;
  selectedCategory: string;

  //CONSTANTS
  NUM_OF_QUESTIONS: number = 10;
  CORRECT_BONUS: number = 10;
  MAX_QUESTIONS: number = 5;

  acceptingAnswers: boolean = false;
  score: number = 0;
  questionCounter: number = 0;
  scoreText: string = '0';
  progressText: string = '';

  constructor (private quizService: QuizService, private renderer: Renderer2, private elementRef: ElementRef, private router: Router) {
      this.currentQuestion = {
        category: '',
        difficulty: '',
        question: '',
        answer: 0,
        choices: [],
        correct_answer: '',
        incorrect_answers: []
      }

      this.selectedCategory = this.quizService.getSelectedCategory();
    }

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(data => {
      let loadedQuestions: rawQuestion[] = data;

      this.questions = this.questionsFormatter(loadedQuestions);

      this.startGame();
    });
  }

  choiceFormatter(choice: string, index: number): Choice {
    let prefixAsciiValue = 65; // A
    let formattedChoice = {
        prefix: String.fromCharCode(prefixAsciiValue + index),
        choice,
        data_number:  index+1
      }
    return formattedChoice;
  }
  
  questionsFormatter(loadedQuestions: rawQuestion[]): Question[] {
    let neatQuestions: Question[] = [];
    
    loadedQuestions.forEach((loadedQuestion: rawQuestion) => {
      if (loadedQuestion.category !== this.selectedCategory) {
        return;
      }
      const formattedQuestion: Question = {
        category: loadedQuestion.category,
        difficulty: loadedQuestion.difficulty,
        question: loadedQuestion.question,
        correct_answer: loadedQuestion.correct_answer,
        incorrect_answers: loadedQuestion.incorrect_answers,
        answer: 0,
        choices: []
      };

      const answerChoices: string[] = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      // Add the correct answer to the index with the answer value
      answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

      answerChoices.forEach((choice: string, index: number) => {
        // Formatting each choice
        formattedQuestion.choices[index] = this.choiceFormatter(choice, index);
      });

      neatQuestions.push(formattedQuestion);
    });

    return neatQuestions;
  }

  startGame(): void {
    this.questionCounter = 0;
    this.score = 0;
    this.availableQuestions = [...this.questions];
    this.getNewQuestion();

    const game = this.elementRef.nativeElement.querySelector('#game');
    const loader = this.elementRef.nativeElement.querySelector('#loader');

    this.renderer.removeClass(game, 'hidden');
    this.renderer.addClass(loader, 'hidden');
  }

  getNewQuestion = () => {
    if (this.availableQuestions.length === 0 || this.questionCounter >= this.MAX_QUESTIONS) {
      this.quizService.setMostRecentScore(this.score);
      // localStorage.setItem('mostRecentScore', this.score);
      //go to the end page
      this.router.navigate(['/end']);
    }
    this.questionCounter++;

    this.progressText = `Question ${this.questionCounter}  /  ${this.MAX_QUESTIONS}`;
    // Update the progress bar
    const progressBarFull = this.elementRef.nativeElement.querySelector('#progressBarFull');
    const width = `${(this.questionCounter / this.MAX_QUESTIONS) * 100}%`;
    this.renderer.setStyle(progressBarFull, 'width', width);

    const questionIndex = Math.floor(Math.random() * this.availableQuestions.length);
    this.currentQuestion = this.availableQuestions[questionIndex];

    this.availableQuestions.splice(questionIndex, 1);
    this.acceptingAnswers = true;
  };

  onChoiceClick(choice: Choice): void {
    if (!this.acceptingAnswers) return;

    this.acceptingAnswers = false;
    const selectedChoice = this.elementRef.nativeElement.querySelector(`#choice-${choice.data_number}`);
    const selectedAnswer = choice.data_number;

    const classToApply = (selectedAnswer == this.currentQuestion.answer) ? "correct" : "incorrect";

    if(classToApply === 'correct') {
        this.incrementScore(this.CORRECT_BONUS);
    }

    const parentElement = selectedChoice.parentElement;
    this.renderer.addClass(parentElement, classToApply);

    setTimeout(() => {
      this.renderer.removeClass(parentElement, classToApply);
      this.getNewQuestion();
    }, 1000);
  }

  incrementScore = (num: number) => {
    this.score += num;
    this.scoreText = this.score as unknown as string;
};
}