import { Component, EventEmitter, Output } from '@angular/core';
import { SoccerLeadID } from '../Models/soccer.models';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @Output() leagueEmitter = new EventEmitter();

  /**
   * Function to pass the league id to parent component.
   * @param event any type, Note: Tried with mouseEvent but not able to achieve so used type any.
   */
  getStandingDetails(event: any) {
    this.leagueEmitter.emit(this.getLeagueById(event.target.id));
  }

  /**
   * Function to get league id
   * @param id string
   * @returns league id in number format
   */
  getLeagueById(id: string): number {
    let tempID: number = 0;
    switch (id) {
      case 'englandSelect':
        tempID = SoccerLeadID.England;
        break;

      case 'spainSelect':
        tempID = SoccerLeadID.Spain
        break;

      case 'franceSelect':
        tempID = SoccerLeadID.France;
        break;

      case 'germanySelect':
        tempID = SoccerLeadID.Germany;
        break;

      case 'italySelect':
        tempID = SoccerLeadID.Italy;
        break;

    };
    return tempID;
  }

}
