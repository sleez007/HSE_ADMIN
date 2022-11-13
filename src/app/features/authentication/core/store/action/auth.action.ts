import { createAction, createActionGroup, props } from "@ngrx/store";
import { Auth, AuthErrorResponse, AuthResponse } from "../../model";

export const loginActions = createActionGroup({
    source: 'Login Page',
    events: {
        'login': props<Auth>()
    }
});

export const loginEffectActions = createActionGroup({
    source: 'LOGIN Effect',
    events: {
        'login success': props<AuthResponse>(),
        'login error': props<AuthErrorResponse>()
    }
});

export const autoLoginAction = createAction("[APP COMPONENT] auto login")

export const logoutAction = createAction("[DASHBOARD ] logout")