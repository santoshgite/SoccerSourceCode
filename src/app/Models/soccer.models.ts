import { HttpHeaders } from "@angular/common/http";

export enum SoccerLeadID {
    England = 39,
    Spain = 140,
    France = 61,
    Germany = 78,
    Italy = 135
}

export interface ICredentials{
    baseUrl: string;
    key: string;
}