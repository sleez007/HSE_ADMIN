import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ErrorResponse } from "src/app/core/model";
import { ProjectModel } from "../../../../core/model";

export const manageProjectActions = createActionGroup({
    source: 'Create project page',
    events: {
        'get all project': emptyProps(),
        'delete project': props<{id: string | number}>(),
        'edit project': props<ProjectModel>()
    }
});

export const manageProjectApiActions = createActionGroup({
    source: 'Create project effects',
    events: {
        'get all project success': props<{projects: ProjectModel[]}>(),
        'get all project failure': props<ErrorResponse>(),
        'edit project success': props<ProjectModel>(),
        'edit project failure': props<ErrorResponse>(),
        'delete project success': props<{id: number | string}>(),
        'delete project failure': props<ErrorResponse>(),
    }
});