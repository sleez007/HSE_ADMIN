import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ErrorResponse } from "src/app/core/model";
import { StaffData, StaffMedical } from "../../../../core/model";
import { StaffDetail } from "../../model";

export const StaffDetailActions = createActionGroup({
    source: 'Staff details Page',
    events: {
        'get staff detail': props<{data: number | string}>(),
    }
});

export const StaffDetailEffectAction = createActionGroup({
    source: 'Staff details Effect',
    events: {
        'get staff details success': props<{ui: StaffDetail[], bm: StaffDetail[], km: StaffDetail[], ps: StaffDetail[], firstName: string, lastName: string }>(),
        'get staff detail failure': props<ErrorResponse>(),
    }
});