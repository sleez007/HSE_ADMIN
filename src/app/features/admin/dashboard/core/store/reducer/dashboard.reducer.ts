import { createFeature, createReducer, on } from "@ngrx/store";
import { OptionModel } from "src/app/features/admin/core/model";
import { SwitchState } from "../../model";
import { dashboardActions } from "../actions/dashboard.action";

export interface DashboardState {
    selectedSwitch: SwitchState;
    projectOptions: OptionModel[];
    selectedProjectOption: string | number;
    officeData: [];
    projectData: [];
    startDate: string | Date;
    endDate: string | Date;
    isLoading: boolean;
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
   isLoading: false,
   isLoadingProjectOptions: false
}

export const dashboardFeature = createFeature({
    name: 'dashboard',
    reducer: createReducer(
        dashboardInitialState,
        on(dashboardActions.switch, (state, props) => ({ ...state, selectedSwitch: props.data })),
        on(dashboardActions.filter, (state, props) => ({...state, startDate: props.start, endDate: props.end}) ),
    )
})