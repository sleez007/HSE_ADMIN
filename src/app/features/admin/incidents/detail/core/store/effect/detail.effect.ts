import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { catchError, delay, exhaustMap, filter, map, mergeMap, of, switchMap, tap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
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
    ) {}

    getProjects$ = createEffect(() => this.action$.pipe(
        ofType(detailActions.fetchDetails),
        switchMap((data) => this.networkHelper.get<DetailModel[]>(incidentDetailEndpoints.detail+ '/' + data).pipe(
            map((response) => detailEffectActions.fetchDataSuccess({data: response})),
            catchError((error) => of(detailEffectActions.fetchDataFailure({message: error['message'], statusCode: 401})))
        ))
    ));

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
        createdAt: string
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
            createdAt: e.createdAt
        }))

    }
    
}