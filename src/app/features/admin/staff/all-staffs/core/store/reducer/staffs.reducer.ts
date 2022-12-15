import { createFeature, createReducer, on } from "@ngrx/store"
import { StaffData } from "../../../../core/model"
import { StaffsActions, staffsEffectAction } from "../action/staffs.action";

export  interface StaffsState {
    staffList: StaffData[];
    isLoading: boolean;
};

export const staffInitialState: StaffsState = {
    staffList: [],
    isLoading: false,
}

export const staffsFeature = createFeature({
    name: 'all staffs',
    reducer: createReducer(
        staffInitialState,
        on(StaffsActions.getStaffs, (state) => ({...state, isLoading: true})),
        on(staffsEffectAction.getStaffsSuccess, (state, props) => ({...state, isLoading: false, staffList: props.data})),
        on(staffsEffectAction.getStaffsFailure, (state, props) => ({...state, isLoading: false})),
    )
})
