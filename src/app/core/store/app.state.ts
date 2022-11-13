import { routerReducer, RouterReducerState } from "@ngrx/router-store";

export interface AppState {
    router: RouterReducerState<any>,
}

export const rootReducers = {
    router: routerReducer,
}