import { createFeature, createReducer, on } from "@ngrx/store";
import { OptionModel } from "src/app/features/admin/core/model";
import { OfficeModel, ProjectModel, SwitchState } from "../../model";
import { dashboardActions, dashboardEffectActions } from "../actions/dashboard.action";

export interface DashboardState {
    selectedSwitch: SwitchState;
    projectOptions: OptionModel[];
    selectedProjectOption: string | number;
    officeData: OfficeModel[];
    projectData: ProjectModel[];
    projectHead: string[],
    officeHead: string[],
    startDate: string | Date;
    endDate: string | Date;
    isLoadingOffice: boolean;
    isLoadingProject: boolean,
    isLoadingProjectOptions: boolean;
};

export const dashboardInitialState: DashboardState = {
   selectedSwitch : SwitchState.OFFICE,
   projectOptions : [],
   selectedProjectOption: '',
   officeData: [],
   projectData: [],
   startDate: '' ,
   endDate: '',
   isLoadingOffice: false,
   isLoadingProject: false,
   isLoadingProjectOptions: false,
   officeHead: ['Categories', 'Targets', 'Port Harcourt', 'Awka', 'Project', 'Total'],
   projectHead: ['Categories', 'Targets', 'Total']
}

export const dashboardFeature = createFeature({
    name: 'dashboard',
    reducer: createReducer(
        dashboardInitialState,
        on(dashboardActions.switch, (state, props) => ({ ...state, selectedSwitch: props.data })),
        on(dashboardActions.filter, (state, props) => ({...state, startDate: props.start, endDate: props.end}) ),
        on(dashboardActions.fetchOffice,(state) => ({...state, isLoadingOffice: true}) ),
        on(dashboardActions.fetchProject,(state) => ({...state, isLoadingProjectOptions: true}) ),
        on(dashboardActions.toggleProject,(state, prop) => ({...state, isLoadingProject: true, selectedProjectOption: prop.id}) ),
        on(dashboardEffectActions.fetchOfficeSuccess, (state, props)  => ({...state, isLoadingOffice: false, officeData: props.data})),
        on(dashboardEffectActions.fetchProjectSuccess, (state, props) => ({...state, isLoadingProjectOptions: false, projectOptions: props.data })),
        on(dashboardEffectActions.fetchProjectByIdSuccess, (state, props) => ({...state, isLoadingProject: false, projectData: props.data }))
    )
})