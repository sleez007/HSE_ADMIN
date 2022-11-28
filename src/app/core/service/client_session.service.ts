import { Injectable } from "@angular/core";
import { AuthenticatedData } from "src/app/features/authentication/core/model";

@Injectable({providedIn: 'root'})
export class ClientSessionService {
    private userKey =  "user";

    getUserFromLocalStorage(): AuthenticatedData {
        try{
            const userString = localStorage.getItem(this.userKey);
            if(userString){
                let user = JSON.parse(userString);
                const data: AuthenticatedData = {user: user.user, tokens: user.tokens}
                return data;
            }else{
                throw new Error('No User Found');
            }
        }catch(e){
            throw e;
        }
    }

    addUserToLocalStorage(user: AuthenticatedData) {
        localStorage.setItem(this.userKey, JSON.stringify(user) )
    }

}