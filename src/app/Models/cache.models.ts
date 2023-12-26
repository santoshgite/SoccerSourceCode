import { IStanding } from "./stadings.models"

export interface ICachedData {
    league?: IChacheLeageTypes;
}

export interface IChacheLeageTypes {
    [leagueID: number]: IStanding;
}


