import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { OptionModel } from "src/app/features/admin/core/model";
import {  OfficeModel, ProjectModel, SwitchState } from "../../model";

export const dashboardActions = createActionGroup({
    source: 'Dashboard Page',
    events: {
        'switch': props<{data: SwitchState}>(),
        'filter': props<{start: string | Date, end: string | Date}>(),
        'toggle project': props<{id: string | number}>(),
        'fetch office': emptyProps(),
        'fetch project': emptyProps
    }
});

export const dashboardEffectActions = createActionGroup({
    source: 'Dashboard Effect',
    events: {
        'filter success': props<any>(),
        'filter failure': props<any>(),
        'fetch office success': props<{data: OfficeModel[]}>(),
        'fetch project success': props<{data: OptionModel[]}>(),
        'fetch project by id success': props<{data: ProjectModel[]}>(),
        'fetch failure': props<any>(),
    }
});