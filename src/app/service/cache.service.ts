import { Injectable } from '@angular/core';
import { IStanding } from '../Models/stadings.models';
import { ICachedData } from '../Models/cache.models';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  data: ICachedData | undefined;

  /**
   * Function to set the data in local storage based on key and value key i.e league id and value the data.
   * @param leagueID Number of the league.
   * @param data data for specified league.
   */
  setCacheData(leagueID: number, data: IStanding): void {
    let ldata = JSON.parse(localStorage.getItem('standings') as string) || null;
    if (!ldata) {
      ldata = {
        league: {
          [leagueID]: data,
        }
      }
    } else {
      ldata.league = Object.assign({ [leagueID]: data }, ldata.league);
    }
    localStorage.setItem('standings', JSON.stringify(ldata));
  }

  /**
   * Function to retrieve the cached data from the local storage
   * @param leagueID Number of the league to retrieve
   * @returns IStanding Data for the league
   */
  getCachedData(leagueID: number): IStanding {
    const data = JSON.parse(localStorage.getItem('standings') as string);
    return data.league[leagueID] as IStanding;
  }

  /**
   * Function to check if the league data is present in localstorage or not.
   * @param leagueID Number of the league.
   * @returns boolean based on whether the league is present in localstorage or not
   */
  isCached(leagueID: number): boolean {
    const data = JSON.parse(localStorage.getItem('standings') as string);
    return data !== null ? !!Object.getOwnPropertyDescriptor(data?.league, [leagueID].toString()) : false;
  }
}
