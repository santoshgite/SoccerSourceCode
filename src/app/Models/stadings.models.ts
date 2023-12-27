export interface IStanding {
    league: ILeague[] | undefined;
}

export interface ILeague {
    logo: string;
    name: string;
    games: number;
    win: number;
    lose: number;
    draw: number;
    goalDifference: number;
    points: number;
    teamID: number;

}


export interface IStandingResponseObject {
    response?: ILeagueResponse[] | undefined;

}

export interface ILeagueResponse {
    league?: IStandApi;
}

export interface IStandApi {
    standings: IStandingResponse[][];
}

export interface IStandingResponse {
    team: ITeam;
    goalsDiff: number;
    points: number;
    all: IAll;
}

export interface IAll {
    played: number;
    win: number;
    lose: number;
    draw: number;

}
export interface ITeam {
    logo: string;
    name: string;
    id: number;
}

export interface IEvent {
    target: {
        id: string;
    }
}