import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthenticatedData } from "../../model";
import { loginActions, loginEffectActions } from "../action/auth.action";

export  interface AuthState {
    user: AuthenticatedData | null,
    isLoginLoading: boolean
};

export const loginInitialState: AuthState = {
    user: null,
    isLoginLoading: false
}


export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        loginInitialState,
        on(loginActions.login, (state) => ({...state, isLoginLoading: true})),
        on(loginEffectActions.loginSuccess, (state, props)=> ({...state, isLoginLoading: false, user: {user: props.user, tokens: props.tokens}})),
        on(loginEffectActions.loginError, (state) => ({...state, isLoginLoading: false}))
    )
})