import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { ErrorResponse } from "src/app/core/model";
import { DetailModel } from "../../model/detail.model";

export const detailActions = createActionGroup({
    source: 'incident detail',
    events: {
        'filter': props<{start: string | Date, end: string | Date}>(),
        'delete incident': props<{id: string | number}>(),
        'edit incident': props<DetailModel>()
    }
});

export const detailEffectActions = createActionGroup({
    source: 'Incident Detail Effect',
    events: {
        'filter success': props<any>(),
        'filter failure': props<ErrorResponse>(),
        'fetch data success': props<{data: DetailModel[]}>(),
        'fetch data failure': props<ErrorResponse>(),
        'edit incident success': props<DetailModel>(),
        'edit incident failure': props<ErrorResponse>(),
        'delete incident success': props<{id: number | string}>(),
        'delete incident failure': props<ErrorResponse>(),
    }
});