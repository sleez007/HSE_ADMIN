import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router} from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, retry, switchMap, tap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { ToastService } from "src/app/core/service";
import { OptionModel } from "src/app/features/admin/core/model";
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
        private readonly store: Store,
        private toaster: ToastService
    ) {}
    storedStaffData$ = createEffect(() => this.action$.pipe(
        ofType(createStaffActions.storeStaffData),
        tap(() => console.log(this.route)),
        tap(() => this.router.navigate(['/dashboard/create-staff/medical'], {relativeTo: this.route}))
    ),{dispatch: false});

    saveUserToServer$ = createEffect(() => this.action$.pipe(
        ofType(createStaffMedicalActions.storeStaffData),
        switchMap((medicals)=> this.store.select(staffFeature.selectStaffData).pipe(map((staffInfo)=> ({...medicals, ...staffInfo})))),
        exhaustMap(staffRecord => this.networkHelper.post<any, StaffData & StaffMedical>(staffEndpoints.create_user, staffRecord).pipe(
            map((data)=> staffEffectAction.createStaffSuccess(data)),
            catchError((error: HttpErrorResponse) => of(staffEffectAction.createStaffFailure({message: error.error['message'], statusCode: error.status})))
        ))) 
    );

    savedSuccess$ = createEffect(() => this.action$.pipe(
        ofType(staffEffectAction.createStaffSuccess),
        tap(() => this.toaster.showSuccess('Success!', 'Added Staff'))
    ), {dispatch: false})

    savedFailure$ = createEffect(() => this.action$.pipe(
        ofType(staffEffectAction.createStaffFailure),
        tap((e)=> this.toaster.showError('Error', e.message)),
    ),{dispatch: false})

    getSupervisor$ = createEffect(() => this.action$.pipe(
        ofType(createStaffActions.fetchSupervisors),
        mergeMap(() => this.networkHelper.get<{id: number, first_name: string, last_name: string}[]>(staffEndpoints.get_supervisors).pipe(
            map((resp) => staffEffectAction.retrievedSupervisorSuccess({data: this.filterSupervisors(resp) })),
            retry(5),
            catchError((error: HttpErrorResponse) => of(staffEffectAction.retrievedSupervisorFailure({message: error.error['message'], statusCode: error.status})))
        ))
    ))

    filterSupervisors(data: {id: number, first_name: string, last_name: string}[] ): OptionModel[]{
        return data.map(s => ({name: s.first_name +' '+ s.last_name, code: s.id}))
    }
}