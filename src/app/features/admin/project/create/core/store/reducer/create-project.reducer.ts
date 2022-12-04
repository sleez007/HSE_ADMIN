import { createFeature, createReducer, on } from "@ngrx/store";
import { OptionModel } from "src/app/features/admin/core/model";
import { ProjectModel } from "../../../../core/model";
import { createProjectActions, createProjectApiActions } from "../action/create-project.action";

export  interface CreateProjectState {
    project: ProjectModel | null;
    isLoading: boolean;
    status: OptionModel[];
    isSaved: boolean;
};

export const projectInitialState: CreateProjectState = {
    project: null,
    isLoading: false,
    status: [
        { name: 'Ongoing', code: false},
        { name: 'Completed', code: true},
    ],
    isSaved: false,
} 


export const projectFeature = createFeature({
    name: 'add project',
    reducer: createReducer(
        projectInitialState,
        on(createProjectActions.addProject, (state) => ({...state, isLoading: true, isSaved: false})),
        on(createProjectActions.editProject, (state)=> ({...state, isLoading: true})),
        on(createProjectApiActions.editProjectFailure, (state) => ({...state, isLoading: false})),
        on(createProjectApiActions.createProjectFailure, (state) => ({...state, isLoading: false})),
        on(createProjectApiActions.editProjectSuccess, (state) => ({...state, isLoading: false,  isSaved: true})),
        on(createProjectApiActions.createProjectSuccess, (state) => ({...state, isLoading: false, isSaved: true}))
    )
})