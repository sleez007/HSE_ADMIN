import { createAction, createActionGroup, props } from "@ngrx/store";
import { Auth, AuthenticatedData, AuthErrorResponse, AuthResponse } from "../../model";

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

export const rehydrateUserAction = createAction("[App Component] rehydrate")
export const rehydrateUserSuccessAction = createAction("[App Component] rehydrate success", props<AuthenticatedData>())
export const rehydrateUserFailureAction = createAction("[App Component] rehydrate failure")