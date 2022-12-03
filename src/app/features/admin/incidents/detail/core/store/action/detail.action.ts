import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { ErrorResponse } from "src/app/core/model";
import { DetailModel } from "../../model/detail.model";

export const detailActions = createActionGroup({
    source: 'Dashboard Page',
    events: {
        'filter': props<{start: string | Date, end: string | Date}>(),
        'fetch details': props<{id: string}>
    }
});

export const detailEffectActions = createActionGroup({
    source: 'Dashboard Effect',
    events: {
        'filter success': props<any>(),
        'filter failure': props<ErrorResponse>(),
        'fetch data success': props<{data: DetailModel[]}>(),
        'fetch data failure': props<ErrorResponse>(),
    }
});