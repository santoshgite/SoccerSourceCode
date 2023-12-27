import { Injectable } from '@angular/core';
import { SoccerLeadID } from '../Models/soccer.models';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  /**
   * Function to get league id
   * @param id string
   * @returns league id in number format
   */
  getLeagueById(attributeId: string | null): number {
    let tempID = 0;
    switch (attributeId) {
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

    }
    return tempID;
  }
}
