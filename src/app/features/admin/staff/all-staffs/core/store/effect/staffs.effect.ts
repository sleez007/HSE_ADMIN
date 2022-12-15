import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of, retry } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { ToastService } from "src/app/core/service";
import { staffEndpoints } from "../../../../core/constants";
import { StaffData } from "../../../../core/model";
import { StaffsActions, staffsEffectAction } from "../action/staffs.action";

@Injectable()
export class StaffsEffect {
    constructor(
        private readonly action$: Actions, 
        private readonly networkHelper: NetworkHelperService, 
        private readonly router: Router, 
        private readonly route: ActivatedRoute,
        private readonly store: Store,
        private toaster: ToastService
    ) {}

    fetchUsers$ = createEffect(() => this.action$.pipe(
        ofType(StaffsActions.getStaffs),
        mergeMap(() => this.networkHelper.get<any[]>(staffEndpoints.all_user).pipe(
            map(e => staffsEffectAction.getStaffsSuccess({data: this.mapApiStaffsToModelStaffs(e)})),
            retry(5),
            catchError((error: HttpErrorResponse) => of(staffsEffectAction.getStaffsFailure({message: error.error['message'], statusCode: error.status })))
        ))
    ));

    mapApiStaffsToModelStaffs(apiStaff: any[]): StaffData[]{
        return apiStaff.map(e => ({firstName: e.first_name, lastName: e.last_name, id: e.id, email: e.email, gender: e.gender, phoneNumber: e.phone, position: e.position, entity: e.entity, location: e.location, role: e.role, supervisor: e.supervisor }))
    }
}