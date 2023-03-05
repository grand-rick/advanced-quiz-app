import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { HighScoresComponent } from './components/high-scores/high-scores.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', component: GameComponent }
  { path: 'high-scores', component: HighScoresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
