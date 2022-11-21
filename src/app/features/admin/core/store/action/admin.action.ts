import { createActionGroup, props } from "@ngrx/store";

export const adminActions = createActionGroup({
    source: 'Admin Page',
    events: {
        'toggle menu': props<{nodeIndex: number}>(),
    }
});