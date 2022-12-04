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
    selectedId: number | string
};

export const manageInitialState: manageProjectState = {
    projects: [],
    isLoading: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    selectedId: -1,
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
        on(manageProjectActions.editProject, (state, props)=> ({...state, isLoadingEdit: true, selectedId: props.projectId!})),
        on(manageProjectActions.deleteProject, (state, props) => ({...state, isLoadingDelete: true, selectedId: props.id})),
        on(manageProjectApiActions.getAllProjectSuccess, (state, props) => ({...state, isLoading: false, projects: props.projects})),
        on(manageProjectApiActions.getAllProjectFailure, (state) => ({...state, isLoading: false})),
        on(manageProjectApiActions.editProjectSuccess, (state, props) => ({...state, isLoadingEdit: false, projects: updateProjectsAfterEdit(state.projects, props), selectedId: -1})),
        on(manageProjectApiActions.editProjectFailure, (state) => ({...state, isLoadingEdit: false, selectedId: -1})),
        on(manageProjectApiActions.deleteProjectSuccess, (state, props) => ({...state, isLoadingDelete: false, projects: deleteProject(state.projects,props.id), selectedId: -1})),
        on(manageProjectApiActions.deleteProjectFailure, (state) => ({...state, isLoadingDelete: false, selectedId: -1})),
    )
})

function updateProjectsAfterEdit(projects: ProjectModel[], project: ProjectModel) {
    return projects.map(p => p.projectId == project.projectId ? project : p)
}

function deleteProject(projects: ProjectModel[], id:  number | string){
    return projects.filter(p => p.projectId != id)
}