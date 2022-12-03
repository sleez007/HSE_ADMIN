import { createFeature, createReducer, on } from "@ngrx/store";
import { OptionModel } from "src/app/features/admin/core/model";
import { detailActions, detailEffectActions } from "../action/detail.action";

export interface DetailState {
    officeData: Object;
    startDate: string | Date;
    endDate: string | Date;
    isLoading: boolean
};

export const detailInitialState: DetailState = {
   officeData: {},
   startDate: '' ,
   endDate: '',
   isLoading: false
}

export const detailFeature = createFeature({
    name: 'detail',
    reducer: createReducer(
        detailInitialState,
        on(detailActions.filter, (state, props) => ({...state, startDate: props.start, endDate: props.end, isLoading: true }) ),
        on(detailActions.fetchDetails,(state) => ({...state, isLoadingOffice: true}) ),
        on(detailEffectActions.fetchDataSuccess,(state) => ({...state, isLoadingProjectOptions: true}) ),
        on(detailEffectActions.fetchDataFailure,(state) => ({...state, isLoadingProjectOptions: false}) ),
    )
})