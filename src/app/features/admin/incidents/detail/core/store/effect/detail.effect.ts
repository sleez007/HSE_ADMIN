import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { catchError, filter, map, mergeMap, of, retry, switchMap, tap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { ToastService } from "src/app/core/service";
import { staffEndpoints } from "src/app/features/admin/staff/core/constants";
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
            catchError((error: HttpErrorResponse) => of(detailEffectActions.fetchDataFailure({message: error.error['message'], statusCode: error.status })))
        ))
    ))

    deleteProject$ = createEffect(() => this.action$.pipe(
        ofType(detailActions.deleteIncident),
        mergeMap((prop) => this.networkHelper.delete<any>(incidentDetailEndpoints.delete+'/'+prop.id).pipe(
            map(e => detailEffectActions.deleteIncidentSuccess({id: prop.id})),
            catchError((error: HttpErrorResponse) => of(detailEffectActions.deleteIncidentFailure({message: error.error['message'], statusCode: error.status })))
        ))
    ));

    fetchUsers$ = createEffect(() => this.action$.pipe(
        ofType(detailActions.fetchUsers),
        mergeMap(() => this.networkHelper.get<{id: number, first_name: string, last_name: string}[]>(staffEndpoints.all_user).pipe(
            map(e => detailEffectActions.fetchUserSuccess({data: e.map(i => ({code: i['id'], name: i.first_name + ' '+ i.last_name}))})),
            retry(5),
            catchError((error: HttpErrorResponse) => of(detailEffectActions.fetchDataFailure({message: error.error['message'], statusCode: error.status })))
        ))
    ));

    editProject$ = createEffect(() => this.action$.pipe(
        ofType(detailActions.editIncident),
        switchMap((props) => this.networkHelper.post<any, any>(incidentDetailEndpoints.update, {
            "incident_id": ' '+ props.id,
            "project_id": "",
            "user_id": ' '+ props.assignedToId,
            "location": props.location,
            "incident_category": props.incidentCategory,
            "description": props.description,
            "response": props.response,
            "is_corrective_action_required": props.isCorrectiveActionRequired,
            "corrective_action": props.correctiveAction,
            "assign_to":props.assignedToId,
            "incident_source": props.incidentSource,
            "risk_matrix": props.riskMatrix,
            "incident_status":props.incidentStatus,
            "incident_remarks": props.incidentRemarks,
            "due_date": props.dueDate,
            "assign_to_id": props.assignedToId
        }).pipe(
            map(e => detailEffectActions.editIncidentSuccess(props) ),
            catchError((error: HttpErrorResponse) => of(detailEffectActions.editIncidentFailure({message: error.error['message'], statusCode: error.status })))
        ))
    ));


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
        id: number,
        assign_to_id: number
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
            id: e.id,
            assignedToId: e.assign_to_id
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