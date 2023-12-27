import { Component, EventEmitter, Output } from '@angular/core';
import { UtilityService } from '../service/utility.service';
import { SoccerService } from '../service/soccer.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private utilityService: UtilityService, public soccerService: SoccerService) { }

  @Output() leagueEmitter = new EventEmitter();


  /**
   * Function to pass the league id to parent component.
   * @param event Event object
   */
  getStandingDetails(event: Event) {
    const elementId: string = (event.target as Element).id;
    this.leagueEmitter.emit(this.utilityService.getLeagueById(elementId));
  }

}
