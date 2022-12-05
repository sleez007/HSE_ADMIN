import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { DateFormatter } from "src/app/core/util";
import { OptionModel } from "src/app/features/admin/core/model";
import { incidentEndpoints } from "src/app/features/admin/dashboard/core/constants";
import { SwitchState, OfficeModel, ProjectModel } from "src/app/features/admin/dashboard/core/model";

import { incidentActions, incidentEffectActions } from "../actions/incident.actions";
import { incidentFeature } from "../reducer/incident.reducer";

@Injectable()
export class IncidentEffect {
    constructor(
        private readonly action$: Actions, 
        private readonly networkHelper: NetworkHelperService, 
        private readonly store: Store,
    ) {}

    getOffice$ = createEffect(() => this.action$.pipe(
        ofType(incidentActions.fetchOffice),
        switchMap(() => this.networkHelper.get<Object>(incidentEndpoints.office).pipe(
            map((response) => {
                const reformatedArray = this.formatDataForOffice(response)
                return incidentEffectActions.fetchOfficeSuccess({data: reformatedArray})
            }),
            catchError((error) => of(incidentEffectActions.fetchFailure({message: error['message'], statusCode: 401})))
        ))
    ))

    getProjectsById$ = createEffect(() => this.action$.pipe(
        ofType(incidentActions.toggleProject),
        switchMap((p) => this.networkHelper.get<Object>(incidentEndpoints.project+'/'+p.id).pipe(
            map((response) => {
                const reformatedArray = this.formatDataForProject(response)
                return incidentEffectActions.fetchProjectByIdSuccess({data: reformatedArray})
            }),
            catchError((error) => of(incidentEffectActions.fetchFailure({message: error['message'], statusCode: 401})))
        ))
    ))

    filterSelection$ = createEffect(() => this.action$.pipe(
        ofType(incidentActions.filter),
        withLatestFrom(this.store.select(incidentFeature.selectIncidentsState)),
        switchMap(([prop, staff]) => this.networkHelper.get<Object>(staff.selectedSwitch == SwitchState.OFFICE ? `${incidentEndpoints.office}/${DateFormatter.dateToString(prop.start as Date)}/${DateFormatter.dateToString(prop.end as Date) }`: `${incidentEndpoints.project}/${staff.selectedProjectOption}/${DateFormatter.dateToString(prop.start as Date)}/${DateFormatter.dateToString(prop.end as Date) }`).pipe(
            map(response => {
                console.log(staff.selectedSwitch == SwitchState.OFFICE ? `${incidentEndpoints.office}/${DateFormatter.dateToString(prop.start as Date)}/${DateFormatter.dateToString(prop.end as Date) }`: `${incidentEndpoints.project}/${staff.selectedProjectOption}/${DateFormatter.dateToString(prop.start as Date)}/${DateFormatter.dateToString(prop.end as Date) }`)
                if(staff.selectedSwitch == SwitchState.OFFICE){
                    const reformatedArray = this.formatDataForOffice(response)
                    return incidentEffectActions.fetchOfficeSuccess({data: reformatedArray})
                }else{
                    const reformatedArray = this.formatDataForProject(response)
                    return incidentEffectActions.fetchProjectByIdSuccess({data: reformatedArray})
                }
            }),
            catchError((error) => of(incidentEffectActions.fetchFailure({message: error['message'], statusCode: 401})))
        ))
    ))

    getProjects$ = createEffect(() => this.action$.pipe(
        ofType(incidentActions.fetchProject),
        switchMap(info => this.networkHelper.get<{id: number, title: string}[]>(incidentEndpoints.allProjects).pipe(
            map((resp => incidentEffectActions.fetchProjectSuccess({data: this.formatProjects(resp)}))),
            catchError((error) => of(incidentEffectActions.fetchFailure({message: error['message'], statusCode: 401})))
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