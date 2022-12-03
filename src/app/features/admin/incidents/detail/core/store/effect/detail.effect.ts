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
           return d['params']['category']
        } ),
        switchMap((data) => this.networkHelper.get<DetailModel[]>(incidentDetailEndpoints.detail+ '/' + data).pipe(
            map((response) => detailEffectActions.fetchDataSuccess({data: response})),
            catchError((error) => of(detailEffectActions.fetchDataFailure({message: error['message'], statusCode: 401})))
        ))

    ))
    
}

// {"near miss":{"target":0,"port harcourt":2,"awka":0,"project":0,"total":2},"unsafe conditions":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"first aid case":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"fatality":{"target":0,"port harcourt":1,"awka":1,"project":0,"total":2},"road traffic accident":{"target":0,"port harcourt":0,"awka":0,"project":1,"total":1},"spill prevention, control and counted":{"target":0,"port harcourt":3,"awka":0,"project":1,"total":4},"medical treatment case":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"unsafe act":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"lost work day case":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"lost time injury":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"safe act":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"property/equip damage":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"theft incident":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"enforcement notice":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"stop work authority":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"restricted work case":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0},"service quality":{"target":0,"port harcourt":0,"awka":0,"project":0,"total":0}}