import { createFeature, createReducer, on } from "@ngrx/store";
import { SwitchState } from "src/app/features/admin/dashboard/core/model";
import { dashboardInitialState, } from "src/app/features/admin/dashboard/core/store";
import { incidentActions, incidentEffectActions } from "../actions/incident.actions";

export const incidentFeature = createFeature({
    name: 'incidents',
    reducer: createReducer(
        dashboardInitialState,
        on(incidentActions.switch, (state, props) => ({ ...state, selectedSwitch: props.data })),
        on(incidentActions.filter, (state, props) => ({...state, startDate: props.start, endDate: props.end, isLoadingOffice : state.selectedSwitch == SwitchState.OFFICE ? true : state.isLoadingOffice, isLoadingProject: state.selectedSwitch == SwitchState.PROJECT ? true : state.isLoadingProject  }) ),
        on(incidentActions.fetchOffice,(state) => ({...state, isLoadingOffice: true}) ),
        on(incidentActions.fetchProject,(state) => ({...state, isLoadingProjectOptions: true}) ),
        on(incidentActions.toggleProject,(state, prop) => ({...state, isLoadingProject: true, selectedProjectOption: prop.id}) ),
        on(incidentEffectActions.fetchOfficeSuccess, (state, props)  => ({...state, isLoadingOffice: false, officeData: props.data})),
        on(incidentEffectActions.fetchProjectSuccess, (state, props) => ({...state, isLoadingProjectOptions: false, projectOptions: props.data })),
        on(incidentEffectActions.fetchProjectByIdSuccess, (state, props) => ({...state, isLoadingProject: false, projectData: props.data }))
    )
})