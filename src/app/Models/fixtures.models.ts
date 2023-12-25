export interface IResults {
    home: IResultsData;
    away: IResultsData;
}

export interface IResultsData {
    logo: string;
    name: string;
    goals: number;
}

export interface Iparams {
    team: number;
    league: number;
}

export interface IFixtureApiResponse {
    response: IApiFixture[]
};

export interface IApiFixture {
    teams: {
        home: {
            logo: string;
            name: string;
        },
        away: {
            logo: string;
            name: string;
        },

    },
    goals: {
        home: number;
        away: number;
    }

}