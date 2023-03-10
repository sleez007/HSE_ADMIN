import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthenticatedData } from "../../model";
import { loginActions, loginEffectActions, logoutAction, logoutSuccessAction, rehydrateUserSuccessAction } from "../action/auth.action";

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
        on(loginEffectActions.loginSuccess, (state, props)=> ({...state, isLoginLoading: false, user: {user: props.user,tokens: props.jwt }})),
        on(loginEffectActions.loginError, (state) => ({...state, isLoginLoading: false})),
        on(logoutAction, (state) => ({...state, user: null})),
        on(rehydrateUserSuccessAction, (state, props) => ({...state, user: props})),
        on(logoutSuccessAction, (state) => ({...state, ...loginInitialState}))
    )
})