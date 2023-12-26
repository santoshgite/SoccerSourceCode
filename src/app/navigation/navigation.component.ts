import { Component, EventEmitter, Output } from '@angular/core';
import { SoccerLeadID } from '../Models/soccer.models';
import { UtilityService } from '../service/utility.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private utilityService:UtilityService){}

  @Output() leagueEmitter = new EventEmitter();

  /**
   * Function to pass the league id to parent component.
   * @param event any type, Note: Tried with mouseEvent but not able to achieve so used type any.
   */
  getStandingDetails(event: any) {
    this.leagueEmitter.emit(this.utilityService.getLeagueById(event.target.id));
  }

}
