import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { HighScoresComponent } from './components/high-scores/high-scores.component';
import { EndComponent } from './components/end/end.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  { path: 'lobby', component: HomeComponent },
  { path: 'game', component: GameComponent },
  { path: 'high-scores', component: HighScoresComponent },
  { path: 'end', component: EndComponent },
  { path: '', component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
