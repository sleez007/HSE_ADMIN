import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { OptionModel } from "src/app/features/admin/core/model";
import { OfficeModel, ProjectModel, SwitchState } from "src/app/features/admin/dashboard/core/model";

export const incidentActions = createActionGroup({
    source: 'Incident Page',
    events: {
        'switch': props<{data: SwitchState}>(),
        'filter': props<{start: string | Date, end: string | Date}>(),
        'toggle project': props<{id: string | number}>(),
        'fetch office': emptyProps(),
        'fetch project': emptyProps
    }
});

export const incidentEffectActions = createActionGroup({
    source: 'Incident Effect',
    events: {
        'filter success': props<any>(),
        'filter failure': props<any>(),
        'fetch office success': props<{data: OfficeModel[]}>(),
        'fetch project success': props<{data: OptionModel[]}>(),
        'fetch project by id success': props<{data: ProjectModel[]}>(),
        'fetch failure': props<any>(),
    }
});