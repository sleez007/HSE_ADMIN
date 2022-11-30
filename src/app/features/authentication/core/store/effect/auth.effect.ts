import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { ClientSessionService, TokenValidatorService } from "src/app/core/service";
import { authEndpoints } from "../../constants";
import { Auth, AuthResponse } from "../../model";
import { loginActions, loginEffectActions, logoutAction, logoutSuccessAction, rehydrateUserAction, rehydrateUserFailureAction, rehydrateUserInterceptorAction, rehydrateUserSuccessAction } from "../action/auth.action";

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
    constructor(
        private readonly action$: Actions, 
        private readonly networkHelper: NetworkHelperService, 
        private readonly router: Router, 
        private readonly clientSessionService: ClientSessionService,
        private readonly tokenValidator: TokenValidatorService
    ) {}

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
        tap((data) =>  this.clientSessionService.addUserToLocalStorage({user: data.user, tokens: data.jwt})),
        tap(() => this.router.navigate(['/dashboard']))
    ),{dispatch: false})

    loginError$ = createEffect(() => this.action$.pipe(
        ofType(loginEffectActions.loginError),
        tap((e) => console.log(e))
    ), {dispatch: false});


    logout$ = createEffect(() => this.action$.pipe(
        ofType(logoutAction),
        exhaustMap(() => of(this.clientSessionService.clearUserData()).pipe(
            map(() => logoutSuccessAction())
        ))
    ))

    logoutSuccess$ = createEffect(()=> this.action$.pipe(
        ofType(logoutSuccessAction),
        tap(() => this.router.navigate(['/login'])),
        tap(()=> alert("hi"))
    ), {dispatch: false})

    rehydrateAuth$ = createEffect(() => this.action$.pipe(
        ofType(rehydrateUserAction),
        mergeMap(()=> {
            const user = this.clientSessionService.getUserFromLocalStorage()
            return of(rehydrateUserSuccessAction(user))
        }),
        catchError(()=> of(rehydrateUserFailureAction()))
    ))

    rehydrateInterceptor$ = createEffect(() => this.action$.pipe(
        ofType(rehydrateUserInterceptorAction),
        mergeMap(()=> {
            const user = this.clientSessionService.getUserFromLocalStorage()
            return of(rehydrateUserSuccessAction(user))
        }),
        catchError(()=> of(rehydrateUserFailureAction()))
    ))

}