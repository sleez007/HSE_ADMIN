import { createFeature, createReducer, on } from "@ngrx/store";
import { OptionModel } from "src/app/features/admin/core/model";
import { ProjectModel } from "../../../../core/model";
import { manageProjectActions, manageProjectApiActions } from "../action/manage.action";

export  interface manageProjectState {
    projects: ProjectModel[];
    isLoading: boolean;
    isLoadingDelete: boolean,
    isLoadingEdit: boolean,
    status: OptionModel[];
};

export const manageInitialState: manageProjectState = {
    projects: [],
    isLoading: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    status: [
        { name: 'Ongoing', code: false},
        { name: 'Completed', code: true},
    ],
} 

export const manageProjectFeature = createFeature({
    name: 'manage project',
    reducer: createReducer(
        manageInitialState,
        on(manageProjectActions.getAllProject, (state) => ({...state, isLoading: true})),
        on(manageProjectActions.editProject, (state)=> ({...state, isLoading: true})),
        on(manageProjectActions.deleteProject, (state) => ({...state, isLoginLoading: true})),
        on(manageProjectApiActions.getAllProjectSuccess, (state, props) => ({...state, isLoading: false, projects: props.projects})),
        on(manageProjectApiActions.getAllProjectFailure, (state) => ({...state, isLoading: false})),
        on(manageProjectApiActions.editProjectSuccess, (state, props) => ({...state, isLoading: false, projects: updateProjectsAfterEdit(state.projects, props)})),
        on(manageProjectApiActions.editProjectFailure, (state) => ({...state, isLoading: false})),
        on(manageProjectApiActions.deleteProjectSuccess, (state, props) => ({...state, isLoading: false, projects: deleteProject(state.projects,props)})),
        on(manageProjectApiActions.deleteProjectFailure, (state) => ({...state, isLoading: false})),
    )
})

function updateProjectsAfterEdit(projects: ProjectModel[], project: ProjectModel) {
    delete (project as any).type
    return projects.map(p => p.projectId == project.projectId ? project : p)
}

function deleteProject(projects: ProjectModel[], project: ProjectModel){
    delete (project as any).type
    return projects.filter(p => p.projectId != project.projectId)
}