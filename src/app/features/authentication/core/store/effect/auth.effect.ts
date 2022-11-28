import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { authEndpoints } from "../../constants";
import { Auth, AuthResponse } from "../../model";
import { loginActions, loginEffectActions } from "../action/auth.action";

interface ApiReply{
    admin: {
        first_name: string;
        last_name: string;
        email: string;
    },
    jwt:{
        token: string,
        refreshToken: string,
    },
    refresh_expires: string
}

@Injectable()
export class AuthEffect {
    constructor(private readonly action$: Actions, private readonly networkHelper: NetworkHelperService, private router: Router) {}

    loginUser$ = createEffect(() => this.action$.pipe(
        ofType(loginActions.login),
        exhaustMap(({email, password}) => this.networkHelper.post<ApiReply, Auth>(authEndpoints.login, {email, password}).pipe(
            map(response => loginEffectActions.loginSuccess({
                user: {firstName: response.admin.first_name, lastName: response.admin.last_name, email: response.admin.email},
                jwt: {accessToken: response.jwt.token, refreshToken: response.jwt.refreshToken, refreshExpiry: response.refresh_expires},
                message: 'Login was successful'
            })),
            catchError((error) => of(loginEffectActions.loginError({message: error['message'], statusCode: 401 })))
        ) )
    ));

    loginSuccess$ = createEffect(() => this.action$.pipe(
        ofType(loginEffectActions.loginSuccess),
        // Persist user details to localStorage
        //tap((data) =>  this.authService.addUserToLocalStorage({user: data.user, tokens: data.tokens})),
        tap(() => this.router.navigate(['/dashboard']))
    ),{dispatch: false})

    loginError$ = createEffect(() => this.action$.pipe(
        ofType(loginEffectActions.loginError),
        tap((e) => console.log(e))
    ), {dispatch: false})

    // autoLogin$ = createEffect(() => this.action$.pipe(
    //     ofType(autoLoginAction),
    //     mergeMap((action)=> {
    //         const user = this.authService.getUserFromLocalStorage();
    //         const refresh = this.tokenValidator.getRefreshTokenFromStorage();
    //         if(refresh != null && this.tokenValidator.isValidToken(refresh) ){
    //             return of(loginApiActions.loginSuccess({message: 'Welcome back',...user}))
    //         }else{
    //             return of(loginApiActions.loginError({message: '', statusCode: 401}))
    //         }
    //     }),
    //     catchError(() => of(loginApiActions.loginError({message: '', statusCode: 401})))
       
    // ))

}