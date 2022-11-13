import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { authFeature, AuthState } from "src/app/features/authentication/core/store";

export interface AppState {
    router: RouterReducerState<any>,
    auth: AuthState
}

export const rootReducers = {
    router: routerReducer,
    auth: authFeature.reducer
}