import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { catchError, delay, exhaustMap, filter, map, mergeMap, of, switchMap, tap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { ToastService } from "src/app/core/service";
import { incidentDetailEndpoints } from "../../constants";
import { DetailModel } from "../../model/detail.model";
import { detailActions, detailEffectActions } from "../action/detail.action";

@Injectable()
export class DetailEffect {
    constructor(
        private readonly action$: Actions, 
        private readonly networkHelper: NetworkHelperService, 
        private readonly router: Router,
        private readonly store: Store,
        private toaster: ToastService
    ) {}



    getDetail$ = createEffect(() => this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((r: RouterNavigatedAction) => r.payload.routerState.url.startsWith('/dashboard/detail')),
        map((r: RouterNavigatedAction) =>{
           const d: any = r.payload.routerState;
           return d['params']['category'];
        } ),
        switchMap((data) => this.networkHelper.get<any[]>(incidentDetailEndpoints.detail+ '/' + data).pipe(
            map((response) => detailEffectActions.fetchDataSuccess({data: this.formatDetailToCamel(response)})),
            catchError((error) => of(detailEffectActions.fetchDataFailure({message: error['message'], statusCode: 401})))
        ))
    ))

    deleteProject$ = createEffect(() => this.action$.pipe(
        ofType(detailActions.deleteIncident),
        mergeMap((prop) => this.networkHelper.delete<any>(incidentDetailEndpoints.delete+'/'+prop.id).pipe(
            map(e => detailEffectActions.deleteIncidentSuccess({id: prop.id})),
            catchError((error: HttpErrorResponse) => of(detailEffectActions.deleteIncidentFailure({message: error.error['message'], statusCode: error.status })))
        ))
    ));

    // editProject$ = createEffect(() => this.action$.pipe(
    //     ofType(detailActions.editIncident),
    //     mergeMap((prop) => this.networkHelper.put<any, DetailModel>(incidentDetailEndpoints.update+'/'+prop.reportId, prop).pipe(
    //         map(e => detailEffectActions.editIncidentSuccess({reportId: e.project.id, projectTitle: e.project.title, startDuration: DateFormatter.stringToDate(e.project.start) , endDuration: e.project.end != null ? DateFormatter.stringToDate(e.project.end): null, isCompleted: e.project.is_completed}) ),
    //         catchError((error: HttpErrorResponse) => of(detailEffectActions.editIncidentFailure({message: error.error['message'], statusCode: error.status })))
    //     ))
    // ));

    formatDetailToCamel(data: Array<{
        report_id: string;
        reported_by: string;
        assign_to: string;
        location: string;
        incident_category: string;
        description: string;
        response: string;
        is_corrective_action_required: string;
        corrective_action: string;
        incident_source: string;
        risk_matrix: string;
        incident_status: string;
        incident_remarks: string;
        due_date: string;
        created_at: string
        id: number
    }>): DetailModel[]{
        return data.map(e => ({
            reportId: e.report_id, 
            reportedBy: e.reported_by, 
            assignTo: e.assign_to, 
            location: e.location, 
            incidentCategory: e.incident_category, 
            description: e.description,
            response: e.response,
            isCorrectiveActionRequired: e.is_corrective_action_required,
            correctiveAction: e.corrective_action,
            incidentSource: e.incident_source,
            riskMatrix: e.risk_matrix,
            incidentStatus: e.incident_status,
            incidentRemarks: e.incident_remarks,
            dueDate: e.due_date,
            createdAt: e.created_at,
            id: e.id
        }))

    }

    projectEditSuccess$ = createEffect(() => this.action$.pipe(
        ofType(detailEffectActions.editIncidentSuccess),
        tap(() => this.toaster.showSuccess('Updated', 'Incident updated successfully!'))
    ),{dispatch: false})

    projectEditError$ = createEffect(() => this.action$.pipe(
        ofType(detailEffectActions.editIncidentFailure),
        tap((e) => this.toaster.showError('Error', e.message))
    ), {dispatch: false})

    projectDeleteSuccess$ = createEffect(() => this.action$.pipe(
        ofType(detailEffectActions.deleteIncidentSuccess),
        tap(() => this.toaster.showSuccess('Updated', 'Incident deleted successfully!'))
    ),{dispatch: false})

    projectDeleteError$ = createEffect(() => this.action$.pipe(
        ofType(detailEffectActions.deleteIncidentFailure),
        tap((e) => this.toaster.showError('Error', e.message))
    ), {dispatch: false})
    
}