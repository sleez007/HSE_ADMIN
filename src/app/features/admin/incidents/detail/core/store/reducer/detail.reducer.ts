import { createFeature, createReducer, on } from "@ngrx/store";
import { OptionModel } from "src/app/features/admin/core/model";
import { DetailModel } from "../../model";
import { detailActions, detailEffectActions } from "../action/detail.action";

export interface DetailState {
    itemDetail: DetailModel[];
    startDate: string | Date;
    endDate: string | Date;
    isLoading: boolean;
    isError: boolean,
};

export const detailInitialState: DetailState = {
   itemDetail: [],
   startDate: '' ,
   endDate: '',
   isLoading: false,
   isError: false,
}

export const detailFeature = createFeature({
    name: 'detail',
    reducer: createReducer(
        detailInitialState,
        on(detailActions.filter, (state, props) => ({...state, startDate: props.start, endDate: props.end, isLoading: true }) ),
        on(detailActions.fetchDetails,(state) => ({...state, isLoadingOffice: true}) ),
        on(detailEffectActions.fetchDataSuccess,(state, props) => ({...state, isLoadingProjectOptions: true, itemDetail: props.data}) ),
        on(detailEffectActions.fetchDataFailure,(state) => ({...state, isLoadingProjectOptions: false}) ),
    )
})