import { createFeature, createReducer, on } from "@ngrx/store"
import { StaffDetail } from "../../model";
import { StaffDetailActions, StaffDetailEffectAction } from "../action/det.action";

export  interface StaffDetailState {
    userBasic: StaffDetail[];
    medicalBasic: StaffDetail[];
    keyMedical: StaffDetail[];
    personalData: StaffDetail[]
    isLoading: boolean;
    firstName: string,
    lastName: string
};

export const staffDetailInitialState: StaffDetailState = {
    userBasic: [],
    medicalBasic: [],
    keyMedical: [],
    personalData: [],
    isLoading: true,
    firstName: '',
    lastName: '',
}

export const staffDetailFeature = createFeature({
    name: 'staff detail',
    reducer: createReducer(
        staffDetailInitialState,
        on(StaffDetailActions.getStaffDetail, (state) => ({...state, isLoading: true})),
        on(StaffDetailEffectAction.getStaffDetailsSuccess, (state, props) => ({...state, isLoading: false, userBasic: props.ui, medicalBasic: props.bm, keyMedical: props.km, personalData: props.ps, firstName: props.firstName, lastName: props.lastName})),
        on(StaffDetailEffectAction.getStaffDetailFailure, (state, props) => ({...state, isLoading: false})),
    )
})
