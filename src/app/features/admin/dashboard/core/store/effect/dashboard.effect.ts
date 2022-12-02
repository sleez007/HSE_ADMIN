import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, map, mergeMap, of, switchMap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { OptionModel } from "src/app/features/admin/core/model";
import { incidentEndpoints } from "../../constants";
import { OfficeModel, ProjectModel } from "../../model";
import { dashboardActions, dashboardEffectActions } from "../actions/dashboard.action";

@Injectable()
export class DashboardEffect {
    constructor(
        private readonly action$: Actions, 
        private readonly networkHelper: NetworkHelperService, 
        private readonly router: Router, 
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

    getProjects$ = createEffect(() => this.action$.pipe(
        ofType(dashboardActions.fetchProject),
        delay(3000),
        map(() => dashboardEffectActions.fetchProjectSuccess({data: this.formatProjects([{title: 'Mopu', id: 1}, {title: 'Lammy', id: 2} ])}))
    ))

    formatProjects(proj: any[]): OptionModel[]{
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

// {"near miss":{"target":0,"port harcourt":2,"awka":0,"project":0,"total":2},"unsafe conditions":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"first aid case":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"fatality":{"target":0,"port harcourt":1,"awka":1,"project":0,"total":2},"road traffic accident":{"target":0,"port harcourt":0,"awka":0,"project":1,"total":1},"spill prevention, control and counted":{"target":0,"port harcourt":3,"awka":0,"project":1,"total":4},"medical treatment case":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"unsafe act":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"lost work day case":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"lost time injury":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"safe act":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"property/equip damage":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"theft incident":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"enforcement notice":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"stop work authority":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"restricted work case":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"service quality":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0}}