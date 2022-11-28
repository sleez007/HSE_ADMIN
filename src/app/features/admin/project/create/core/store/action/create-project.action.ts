import { createActionGroup, props } from "@ngrx/store";
import { ErrorResponse } from "src/app/core/model";
import { ProjectModel } from "../../../../core/model";

export const createProjectActions = createActionGroup({
    source: 'Create project page',
    events: {
        'add project': props<ProjectModel>(),
        'edit project': props<ProjectModel>(),
    }
});

export const createProjectApiActions = createActionGroup({
    source: 'Create project effects',
    events: {
        'create project success': props<ProjectModel>(),
        'create project failure': props<ErrorResponse>(),
        'edit project success': props<ProjectModel>(),
        'edit project failure': props<ErrorResponse>(),
    }
});