import { createActionGroup, props } from "@ngrx/store";
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
        'create project failure': props<ProjectModel>(),
        'edit project success': props<ProjectModel>(),
        'edit project failure': props<ProjectModel>(),
    }

});