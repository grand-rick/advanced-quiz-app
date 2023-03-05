import { Component, OnInit, Renderer2, Router } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  question = document.getElementById("question");
  choices = Array.from(document.getElementsByClassName("choice-text"));
  progressText = document.getElementById("progressText");
  scoreText = document.getElementById("score");
  progressBarFull = document.getElementById("progressBarFull");
  loader = document.getElementById("loader");
  game = document.getElementById("game");

  currentQuestion = {};
  acceptingAnswers = false;
  score = 0;
  questionCounter = 0;
  availableQuestions = [];
  questions: string = '';

  //CONSTANTS
  CORRECT_BONUS = 10;
  MAX_QUESTIONS = 3;

  constructor (private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    
  }

  async loadQuestions() {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
      const loadedQuestions = await response.json();

      this.questions = loadedQuestions.results.map((loadedQuestion) => {
        const formattedQuestion = {
            question: loadedQuestion.question,
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];

        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index) => {
            formattedQuestion['choice' + (index + 1)] = choice;
        });

        return formattedQuestion;
        this.startGame();
      });
    } catch (err) {
      console.error(err);
    }
  }

  startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    this.getNewQuestion();
    this.renderer.removeClass(this.game, 'hidden');
    this.renderer.addClass(this.loader, 'hidden');
  }

  getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        // return window.location.assign('end.html');
        this.router.navigate(['/end']);
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}  /  ${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS)* 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };
}


choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];

      const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      if(classToApply === 'correct') {
          incrementScore(CORRECT_BONUS);
      }

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
      }, 1000);
          
      });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};