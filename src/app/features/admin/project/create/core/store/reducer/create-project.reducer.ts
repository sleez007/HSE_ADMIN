import { createFeature, createReducer, on } from "@ngrx/store";
import { OptionModel } from "src/app/features/admin/core/model";
import { ProjectModel } from "../../../../core/model";
import { createProjectActions, createProjectApiActions } from "../action/create-project.action";

export  interface CreateProjectState {
    project: ProjectModel | null;
    isLoading: boolean;
    status: OptionModel[];
};

export const projectInitialState: CreateProjectState = {
    project: null,
    isLoading: false,
    status: [
        { name: 'Ongoing', code: true},
        { name: 'Completed', code: false},
    ]
}


export const projectFeature = createFeature({
    name: 'add project',
    reducer: createReducer(
        projectInitialState,
        on(createProjectActions.addProject, (state) => ({...state, isLoading: true})),
        on(createProjectActions.editProject, (state, props)=> ({...state, isLoading: true})),
        on(createProjectApiActions.editProjectFailure, (state) => ({...state, isLoginLoading: false})),
        on(createProjectApiActions.createProjectFailure, (state) => ({...state, isLoginLoading: false})),
        on(createProjectApiActions.editProjectSuccess, (state) => ({...state, isLoginLoading: false})),
        on(createProjectApiActions.createProjectSuccess, (state) => ({...state, isLoginLoading: false}))
    )
})