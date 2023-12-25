// export interface IStanding {
//     get:        string;
//     parameters: IParameters;
//     errors:     any[];
//     results:    number;
//     paging:     IPaging;
//     response:   Response[];
// }

// export interface IPaging {
//     current: number;
//     total:   number;
// }

// export interface IParameters {
//     league: string;
//     season: string;
// }

// export interface IResponse {
//     league: ILeague;
// }

// export interface ILeague {
//     id:        number;
//     name:      Name;
//     country:   string;
//     logo:      string;
//     flag:      string;
//     season:    number;
//     standings: Array<IStandingElement[]>;
// }

// export enum Name {
//     PremierLeague = "Premier League",
// }

// export interface IStandingElement {
//     rank:        number;
//     team:        ITeam;
//     points:      number;
//     goalsDiff:   number;
//     group:       Name;
//     form:        string;
//     status:      Status;
//     description: null | string;
//     all:         IAll;
//     home:        IAll;
//     away:        IAll;
//     update:      Date;
// }

// export interface IAll {
//     played: number;
//     win:    number;
//     draw:   number;
//     lose:   number;
//     goals:  IGoals;
// }

// export interface IGoals {
//     for:     number;
//     against: number;
// }

// export enum Status {
//     Same = "same",
// }

// export interface ITeam {
//     id:   number;
//     name: string;
//     logo: string;
// }

export interface IStanding {
    league:ILeague[];
}

export interface ILeague {
    logo:string;
    name:string;
    games:number;
    win:number;
    lose:number;
    draw:number;
    goalDifference:number;
points:number;
teamID:number;

}

export interface IStandingResponseObject{
    response:ILeagueResponse[];

}

export interface ILeagueResponse {
    league:IStandApi;
}

export interface IStandApi{
    standings:IStandingResponse[];
}

export interface IStandingResponse{
    team: ITeam;
    goalsDiff:number;
    points:number;
    all:IAll;
}

export interface IAll {
    played:number;
    win:number;
    lose:number;
    draw:number;

}
export interface ITeam{
    logo:string;
    name:string;
    id:number;
}

export interface IEvent{
    target:{
        id:string;
    }
}