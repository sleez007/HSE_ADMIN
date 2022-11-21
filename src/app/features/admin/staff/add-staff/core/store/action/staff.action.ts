import { createActionGroup, props } from "@ngrx/store";
import { StaffData, StaffMedical } from "../../../../core/model";

export const createStaffActions = createActionGroup({
    source: 'Add staff page',
    events: {
        'store staff data': props<StaffData>(),
    }
});

export const createStaffMedicalActions = createActionGroup({
    source: 'Add medical page',
    events: {
        'store staff data': props<StaffMedical>(),
    }
});