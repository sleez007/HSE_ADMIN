import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import {  SwitchState } from "../../model";

export const dashboardActions = createActionGroup({
    source: 'Dashboard Page',
    events: {
        'switch': props<{data: SwitchState}>(),
        'filter': props<{start: string | Date, end: string | Date}>(),
        'toggle project': props<{id: string | number}>(),
        'fetch data': emptyProps()
    }
});

export const DashboardEffectActions = createActionGroup({
    source: 'Dashboard Effect',
    events: {
        'filter success': props<any>(),
        'filter failure': props<any>(),
        'fetch success': props<any>(),
        'fetch failure': props<any>(),
    }
});