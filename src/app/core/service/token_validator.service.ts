import { Injectable } from "@angular/core";
import { AuthToken } from "src/app/features/authentication/core/model";
import { ClientSessionService } from "./client_session.service";

@Injectable({providedIn: 'root'})
export class TokenValidatorService {
    constructor(private readonly clientSessionService: ClientSessionService) {}

    getTimeStamp(): number {
        return Math.floor(Date.now() / 1000);
    }

    isValidToken(token: string): boolean {
        const payload = token.split('.')[1];
        const data = atob(payload);
        console.log(data);
        const payloadObj = JSON.parse(data);
        if(!payloadObj['exp']) return false;
        const expiryTime = payloadObj['exp'];
        return (this.getTimeStamp() <  expiryTime);
    }


    private retrieveTokens(): AuthToken | null{
        const data = this.clientSessionService.getUserFromLocalStorage();
        if(!data  || !data!.tokens) return null;
        return data!.tokens;
    } 

    getAccessTokenFromStorage(): string | null {
        const tokens = this.retrieveTokens();
        if(!tokens) return null;
        return tokens.accessToken;
    }
    
    getRefreshTokenFromStorage(): string | null {
        const tokens = this.retrieveTokens();
        if(!tokens) return null;
        return tokens.refreshToken;
    }
}