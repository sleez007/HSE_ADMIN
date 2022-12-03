import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, delay, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { DateFormatter } from "src/app/core/util";
import { OptionModel } from "src/app/features/admin/core/model";
import { incidentEndpoints } from "../../constants";
import { OfficeModel, ProjectModel, SwitchState } from "../../model";
import { dashboardActions, dashboardEffectActions } from "../actions/dashboard.action";
import { dashboardFeature } from "../reducer/dashboard.reducer";

@Injectable()
export class DashboardEffect {
    constructor(
        private readonly action$: Actions, 
        private readonly networkHelper: NetworkHelperService, 
        private readonly router: Router,
        private readonly store: Store,
    ) {}

    getOffice$ = createEffect(() => this.action$.pipe(
        ofType(dashboardActions.fetchOffice),
        switchMap(() => this.networkHelper.get<Object>(incidentEndpoints.office).pipe(
            map((response) => {
                const reformatedArray = this.formatDataForOffice(response)
                return dashboardEffectActions.fetchOfficeSuccess({data: reformatedArray})
            }),
            catchError((error) => of(dashboardEffectActions.fetchFailure({message: error['message'], statusCode: 401})))
        ))
    ))

    getProjectsById$ = createEffect(() => this.action$.pipe(
        ofType(dashboardActions.toggleProject),
        switchMap((p) => this.networkHelper.get<Object>(incidentEndpoints.project+'/'+p.id).pipe(
            map((response) => {
                const reformatedArray = this.formatDataForProject(response)
                return dashboardEffectActions.fetchProjectByIdSuccess({data: reformatedArray})
            }),
            catchError((error) => of(dashboardEffectActions.fetchFailure({message: error['message'], statusCode: 401})))
        ))
    ))

    filterSelection$ = createEffect(() => this.action$.pipe(
        ofType(dashboardActions.filter),
        switchMap((props) => this.store.select(dashboardFeature.selectDashboardState).pipe(map((staff) => ({
            start: props.start, end: props.end,lastSwitch: staff.selectedSwitch, projectId: staff.selectedProjectOption
        })))),
        
        switchMap(info => this.networkHelper.get<Object>(info.lastSwitch == SwitchState.OFFICE ? `${incidentEndpoints.office}/${DateFormatter.dateToString(info.start as Date)}/${DateFormatter.dateToString(info.end as Date) }`: `${incidentEndpoints.project}/${info.projectId}/${DateFormatter.dateToString(info.start as Date)}/${DateFormatter.dateToString(info.end as Date) }`).pipe(
            map(response => {
                if(info.lastSwitch == SwitchState.OFFICE){
                    const reformatedArray = this.formatDataForOffice(response)
                    return dashboardEffectActions.fetchOfficeSuccess({data: reformatedArray})
                }else{
                    const reformatedArray = this.formatDataForProject(response)
                    return dashboardEffectActions.fetchProjectByIdSuccess({data: reformatedArray})
                }
            }),
            catchError((error) => of(dashboardEffectActions.fetchFailure({message: error['message'], statusCode: 401})))
        ))

    ))

    getProjects$ = createEffect(() => this.action$.pipe(
        ofType(dashboardActions.fetchProject),
        switchMap(info => this.networkHelper.get<{id: number, title: string}[]>(incidentEndpoints.allProjects).pipe(
            map((resp => dashboardEffectActions.fetchProjectSuccess({data: this.formatProjects(resp)}))),
            catchError((error) => of(dashboardEffectActions.fetchFailure({message: error['message'], statusCode: 401})))
        ))
    ))

    formatProjects(proj: {id: number, title: string}[]): OptionModel[]{
        return proj.map((d)=> ({code: d.id, name: d.title}))
    }

    private formatDataForOffice(obj: any): OfficeModel[] {
        let data: OfficeModel[] = [];
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                const value = obj[key];
                let d:OfficeModel = {category: key, target: value.target, ph:value['port harcourt'], awka: value.awka, project: value.project, total: value.total};
                data.push(d);
            }
        }
        console.log(data)
        return data;
    }

    private formatDataForProject(obj: any): ProjectModel[] {
        let data: ProjectModel[] = [];
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                const value = obj[key];
                let d:ProjectModel= {category: key, target: value.target, total: value.total};
                data.push(d);
            }
        }
        console.log(data)
        return data;
    }
}