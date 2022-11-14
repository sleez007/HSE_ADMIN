import { InjectionToken } from "@angular/core";

export const REST_ENDPOINT = 'https://hsebackend.herokuapp.com/api/v1/admin';
export const API_ENDPOINT = new InjectionToken<string>('REST_ENDPOINT');