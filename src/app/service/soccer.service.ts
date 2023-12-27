import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICredentials } from '../Models/soccer.models';
import { ILeague, IStanding, IStandingResponse, IStandingResponseObject } from '../Models/stadings.models';
import { Observable, map, of } from 'rxjs';
import { IApiFixture, IFixtureApiResponse, IResults } from '../Models/fixtures.models';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class SoccerService {

  baseUrl = 'https://v3.football.api-sports.io/standings?league=39&season=2019';
  private credentials: ICredentials = {
    baseUrl: "https://v3.football.api-sports.io/",
    key: '9789d6cdc66dd3da5149ad42147308f6',
  }
  selectedLeague = 0;
  constructor(private http: HttpClient, private cacheService: CacheService) {
  }

  /**
   * Function to get the standings for soccer
   * @param leagueId number i.e league id for fething the specified leagues
   * @returns observable of type IStandings
   */
  getStandings(leagueId: number): Observable<IStanding> {
    if (this.cacheService.isCached(leagueId)) {
      return of(this.cacheService.getCachedData(leagueId));
    } else {
      return this.http.get(`${this.credentials.baseUrl}standings?league=${leagueId}&season=${new Date().getFullYear()}`, { headers: this.getHeaders() }).pipe(
        map((standingResponse: IStandingResponseObject) => {
          const stadingModifiedData: IStanding = {
            league: standingResponse.response ? standingResponse.response[0].league?.standings[0].map((standing: IStandingResponse) => {
              const league: ILeague = {
                logo: standing.team.logo,
                name: standing.team.name,
                games: standing.all.played,
                win: standing.all.win,
                lose: standing.all.lose,
                draw: standing.all.draw,
                goalDifference: standing.goalsDiff,
                points: standing.points,
                teamID: standing.team.id,
              }
              return league;
            }) : []
          }
          this.cacheService.setCacheData(leagueId, stadingModifiedData);
          return stadingModifiedData;
        })
      );
    }

  }

  /**
   * Function to get the headers
   * @returns object of type httpheaders
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": this.credentials.key
    })
  }

  /**
   * Function to get the results for specific teams
   * Note : not able to specify type on line 72 so used any.
   * @param teamID Team id in number format
   * @param leagueID league id in number format
   * @returns Observalbe of type array of IResults
   */
  getFixtures(teamID: number, leagueID: number): Observable<IResults[]> {
    return this.http.get(`${this.credentials.baseUrl}fixtures?team=${teamID}&league=${leagueID}&season=${new Date().getFullYear()}`, { headers: this.getHeaders() }).pipe(
      map((fixtureResponse: IFixtureApiResponse) => {
        const result: IResults[] = fixtureResponse.response ? fixtureResponse?.response.map((fixture: IApiFixture) => {
          const homeObj = {
            home: {
              logo: fixture.teams.home.logo,
              name: fixture.teams.home.name,
              goals: fixture.goals.home,
            },
            away: {
              logo: fixture.teams.away.logo,
              name: fixture.teams.away.name,
              goals: fixture.goals.away,
            }
          };
          return homeObj;
        }) : []
        return result
      })
    )
  }
}
