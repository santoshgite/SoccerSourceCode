import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoccerDashboardComponent } from './soccer-dashboard/soccer-dashboard.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [{
  path: 'dashbaord', component: SoccerDashboardComponent
},
{
  path: '', redirectTo: 'dashbaord', pathMatch: 'full'
},
{
  path: 'results/:league/:team', component: ResultsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
