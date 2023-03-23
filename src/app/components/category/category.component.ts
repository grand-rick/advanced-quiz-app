import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: string[] = this.quizService.getAllCategories();
  isChosen: boolean = false;

  constructor (private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {}

  showSubmitBtn(category: string): void {
  this.isChosen = true;
  this.quizService.setSelectedCategory(category);
  }

  onSubmit(): void {
  this.router.navigate(['/lobby']);
  }
}
