import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ErrorResponse } from "src/app/core/model";
import { OptionModel } from "src/app/features/admin/core/model";
import { StaffData, StaffMedical } from "../../../../core/model";

export const createStaffActions = createActionGroup({
    source: 'Add staff page',
    events: {
        'store staff data': props<StaffData>(),
        'fetch supervisors': emptyProps()
    }
});

export const createStaffMedicalActions = createActionGroup({
    source: 'Add medical page',
    events: {
        'store staff data': props<StaffMedical>(),
    }
});

export const staffEffectAction = createActionGroup({
    source: 'Staff Effect',
    events: {
        'create staff success': props<StaffData & StaffMedical>(),
        'create staff failure': props<ErrorResponse>(),
        'retrieved supervisor success': props<{data: OptionModel[] }>(),
        'retrieved supervisor failure': props<ErrorResponse>()
    }
});