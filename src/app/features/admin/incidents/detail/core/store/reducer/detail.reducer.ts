import { createFeature, createReducer, on } from "@ngrx/store";
import { OptionModel } from "src/app/features/admin/core/model";
import { DetailModel } from "../../model";
import { detailActions, detailEffectActions } from "../action/detail.action";

export interface DetailState {
    itemDetail: DetailModel[];
    startDate: string | Date;
    endDate: string | Date;
    isLoading: boolean;
    isLoadingDelete: boolean,
    isLoadingEdit: boolean,
    status: OptionModel[];
    selectedId: number | string;
    isError: boolean;
};

export const detailInitialState: DetailState = {
    itemDetail: [],
    startDate: '' ,
    endDate: '',
    isLoading: true,
    isError: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    status: [
        {name: 'Open', code: 'open'},
        {name: 'Closed', code: 'closed'}
    ],
    selectedId: -1,
}

export const detailFeature = createFeature({
    name: 'detail',
    reducer: createReducer(
        detailInitialState,
        on(detailActions.filter, (state, props) => ({...state, startDate: props.start, endDate: props.end, isLoading: true }) ),
        on(detailEffectActions.fetchDataSuccess,(state, props) => ({...state, isLoading: false, itemDetail: props.data}) ),
        on(detailEffectActions.fetchDataFailure,(state) => ({...state, isLoading: false}) ),
        on(detailActions.editIncident, (state, props)=> ({...state, isLoadingEdit: true, selectedId: props.reportId!})),
        on(detailActions.deleteIncident, (state, props) => ({...state, isLoadingDelete: true, selectedId: props.id})),
        on(detailEffectActions.editIncidentSuccess, (state, props) => ({...state, isLoadingEdit: false, itemDetail: updateProjectsAfterEdit(state.itemDetail, props), selectedId: -1})),
        on(detailEffectActions.editIncidentFailure, (state) => ({...state, isLoadingEdit: false, selectedId: -1})),
        on(detailEffectActions.deleteIncidentSuccess, (state, props) => ({...state, isLoadingDelete: false, itemDetail: deleteProject(state.itemDetail,props.id), selectedId: -1})),
        on(detailEffectActions.deleteIncidentFailure, (state) => ({...state, isLoadingDelete: false, selectedId: -1})),
    )
})

function updateProjectsAfterEdit(projects: DetailModel[], project: DetailModel) {
    return projects.map(p => p.reportId == project.reportId ? project : p)
}

function deleteProject(projects:DetailModel[], id:  number | string){
    console.log("nam be "+ id+ " be this")
    return projects.filter(p => p.id != id)
}