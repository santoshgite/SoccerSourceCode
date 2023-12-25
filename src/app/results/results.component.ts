import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SoccerService } from '../service/soccer.service';
import { IResults } from '../Models/fixtures.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  constructor(private activeRoute: ActivatedRoute, private soccerService: SoccerService) { }
  results: IResults[] = [];
  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data: Params): void => {
      this.subscription = this.soccerService.getFixtures(data['team'], data['league']).subscribe((result: IResults[]) => {
        this.results = result.slice(0, 10);
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
