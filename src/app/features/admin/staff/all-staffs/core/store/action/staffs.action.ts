import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ErrorResponse } from "src/app/core/model";
import { OptionModel } from "src/app/features/admin/core/model";
import { StaffData, StaffMedical } from "../../../../core/model";

export const StaffsActions = createActionGroup({
    source: 'Staffs Page',
    events: {
        'get staffs': emptyProps(),
        'disable staff': props<{data: number | string}>(),
        'change role': props<{data: number | string}>()
    }
});

export const staffsEffectAction = createActionGroup({
    source: 'Staffs Effect',
    events: {
        'get staffs success': props<{data: StaffData[]}>(),
        'get staffs failure': props<ErrorResponse>(),
        'disable staff success': props<{id: number }>(),
        'disable staff failure': props<ErrorResponse>()
    }
});