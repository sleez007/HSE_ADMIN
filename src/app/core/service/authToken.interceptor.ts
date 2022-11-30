import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, exhaustMap, filter, finalize, map, Observable, of, switchMap, take } from "rxjs";
import { authEndpoints } from "src/app/features/authentication/core/constants";
import { authFeature, rehydrateUserInterceptorAction } from "src/app/features/authentication/core/store";
import { NetworkHelperService } from "../network";
import { ClientSessionService } from "./client_session.service";
import { TokenValidatorService } from "./token_validator.service";

interface  RefreshData{
    token:{
        token: string,
        refreshToken: string,
    },
    refresh_expires: string
}

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    private refreshTokenInProgress: boolean = false;
    private refreshSubject = new BehaviorSubject<RefreshData | null>(null);

    constructor(private readonly store: Store, private readonly tokenValidator: TokenValidatorService, private networkHelper: NetworkHelperService, private readonly clientSession: ClientSessionService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.includes(authEndpoints.login) || req.url.includes(authEndpoints.refresh)) return next.handle(req);
        return this.store.select(authFeature.selectUser).pipe(exhaustMap(user => {
            if(!user){
                throw new Error("LOG_USER_OUT");
            }else{
                if(this.tokenValidator.isValidRefreshToken(user.tokens.refreshExpiry)){
                    if(this.tokenValidator.isValidToken(user.tokens.accessToken!)){
                        const modifiedReq = this.modifyReq(req,user.tokens.accessToken!)
                        return next.handle(modifiedReq);
                    }else{
                        if(this.refreshTokenInProgress){
                            return this.refreshSubject.pipe(
                                map((result) => result),
                                take(1),
                                switchMap((result) =>{
                                    const person = {...user, tokens: {accessToken: result?.token.token ?? '', refreshToken: result?.token.refreshToken ?? '',refreshExpiry:result?.refresh_expires ?? ''  }};
                                    this.clientSession.addUserToLocalStorage(person);
                                    this.store.dispatch(rehydrateUserInterceptorAction());
                                    return next.handle(this.modifyReq(req, person.tokens.accessToken ))
                                } )
                            )
                        }else{
                            this.refreshTokenInProgress = true;
                            this.refreshSubject.next(null);
                            return this.networkHelper.post<RefreshData, {refreshToken: string}>(authEndpoints.refresh, {refreshToken: user.tokens.refreshToken!}).pipe(
                                switchMap((data)=> {
                                    const person = {...user, tokens: {accessToken: data.token.token, refreshToken:  data.token.refreshToken,refreshExpiry:data.refresh_expires  }};
                                    this.clientSession.addUserToLocalStorage(person);
                                    this.store.dispatch(rehydrateUserInterceptorAction());
                                    this.refreshSubject.next(data);
                                    const modifiedReq = this.modifyReq(req, person.tokens.accessToken ?? '' );
                                    return next.handle(modifiedReq);
                                }),
                                finalize(() => (this.refreshTokenInProgress = false))
                            );
                        }
                    }
                }else{
                    throw new Error("LOG_USER_OUT");
                }
            }
        }))
    }

    modifyReq(req: HttpRequest<any>, token: string): HttpRequest<any> {
        let modifiedReq = req.clone({
            setHeaders: {
                'Content-Type' : 'application/json',
                'Accept'       : 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        console.log(modifiedReq.headers.has("Authorization"))
        console.log(modifiedReq.headers.keys())
        return modifiedReq;
    }
}
