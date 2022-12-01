import { Injectable } from "@angular/core";
import { ActivatedRoute, Router} from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, filter, map, mergeMap, of, switchMap, take, takeLast, tap, withLatestFrom } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { staffEndpoints } from "../../../../core/constants";
import { StaffData, StaffMedical } from "../../../../core/model";
import { createStaffActions, createStaffMedicalActions, staffEffectAction } from "../action/staff.action";
import { staffFeature } from "../reducer/staff.reducer";


@Injectable()
export class StaffEffect {
    constructor(
        private readonly action$: Actions, 
        private readonly networkHelper: NetworkHelperService, 
        private readonly router: Router, 
        private readonly route: ActivatedRoute,
        private readonly store: Store
    ) {}
    storedStaffData$ = createEffect(() => this.action$.pipe(
        ofType(createStaffActions.storeStaffData),
        tap(() => console.log(this.route)),
        tap(() => this.router.navigate(['/dashboard/create-staff/medical'], {relativeTo: this.route}))
    ),{dispatch: false});

    saveUserToServer$ = createEffect(() => this.action$.pipe(
        ofType(createStaffMedicalActions.storeStaffData),
        mergeMap((medicals)=> this.store.select(staffFeature.selectStaffData).pipe(map((staffInfo)=> ({...medicals, ...staffInfo})))),
        exhaustMap(staffRecord => this.networkHelper.post<any, StaffData & StaffMedical>(staffEndpoints.create_user, staffRecord).pipe(
            map((p)=> staffEffectAction.createStaffSuccess(p) ),
            catchError(error => of(staffEffectAction.createStaffFailure({message: "", statusCode: 22})))
        ))
    ) )
}