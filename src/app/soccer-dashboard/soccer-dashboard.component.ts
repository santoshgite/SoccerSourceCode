import { Component, OnDestroy, OnInit } from '@angular/core';
import { SoccerService } from '../service/soccer.service';
import { SoccerLeadID } from '../Models/soccer.models';
import { ILeague, IStanding } from '../Models/stadings.models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-soccer-dashboard',
  templateUrl: './soccer-dashboard.component.html',
  styleUrls: ['./soccer-dashboard.component.css']
})
export class SoccerDashboardComponent implements OnInit, OnDestroy {
  standings: IStanding = {
    league: []
  }
  subscriptions: Subscription[] = [];
  constructor(private soccerService: SoccerService,
    private route: Router) { }

  ngOnInit(): void {
    this.soccerService.selectedLeague = this.soccerService.selectedLeague === 0 ? this.soccerService.selectedLeague = SoccerLeadID.England : this.soccerService.selectedLeague;
    const standingSub = this.soccerService.getStandings(this.soccerService.selectedLeague).subscribe((data: IStanding) => {
      this.standings = data;
    });
    this.subscriptions.push(standingSub);
  }

  /**
   * Function to navigate to results page with parameters like leageue id and team id
   * @param league is Object of type ILeague which holds almost all the data of the selected column in table
   */
  showResults(league: ILeague) {
    this.route.navigate([`results/${this.soccerService.selectedLeague}/${league.teamID}`])
  }

  /**
   * Function to invoke when user clickes on navigation buttons and fetch the standing for specific league
   * @param id  is league id in number format
   */
  updateleagueValue(id: number) {
    const standingSub = this.soccerService.getStandings(id).subscribe((data: IStanding) => {
      this.soccerService.selectedLeague = id;
      this.standings = data;
    });
    this.subscriptions.push(standingSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    })
  }
}
