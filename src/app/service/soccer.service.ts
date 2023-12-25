import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICredentials } from '../Models/soccer.models';
import { ILeague, IStanding, IStandingResponse } from '../Models/stadings.models';
import { Observable, map } from 'rxjs';
import { IApiFixture, IResults } from '../Models/fixtures.models';

@Injectable({
  providedIn: 'root'
})
export class SoccerService {

  baseUrl: string = 'https://v3.football.api-sports.io/standings?league=39&season=2019';
  standings: any;
  private credentials: ICredentials = {
    baseUrl: "https://v3.football.api-sports.io/",
    key: '49de05dcffdbfda823a621473e150c7b',
  }
  selectedLeague: number = 0;
  constructor(private http: HttpClient) {
  }

  /**
   * Function to get the standings for soccer
   * @param leagueId number i.e league id for fething the specified leagues
   * @returns observable of type IStandings
   */
  getStandings(leagueId: number): Observable<IStanding> {
    return this.http.get(`${this.credentials.baseUrl}standings?league=${leagueId}&season=${new Date().getFullYear()}`, { headers: this.getHeaders() }).pipe(
      map((x: any) => {
        const data: IStanding = {
          league: x.response[0].league.standings[0].map((y: IStandingResponse) => {
            const league: ILeague = {
              logo: y.team.logo,
              name: y.team.name,
              games: y.all.played,
              win: y.all.win,
              lose: y.all.lose,
              draw: y.all.draw,
              goalDifference: y.goalsDiff,
              points: y.points,
              teamID: y.team.id,
            }
            return league;
          })
        }
        return data;
      })
    )
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
      map((r: any) => {
        const result: IResults[] = r.response.map((fixture: IApiFixture) => {
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
        });
        return result
      })
    )
  }

}
