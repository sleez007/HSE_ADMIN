import { Injectable } from "@angular/core";
import { ActivatedRoute, Router} from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { createStaffActions } from "../action/staff.action";


@Injectable()
export class StaffEffect {
    constructor(private readonly action$: Actions, private readonly networkHelper: NetworkHelperService, private readonly router: Router, private readonly route: ActivatedRoute) {}

    storedStaffData$ = createEffect(() => this.action$.pipe(
        ofType(createStaffActions.storeStaffData),
        tap(() => console.log(this.route)),
        tap(() => this.router.navigate(['/dashboard/create-staff/medical'], {relativeTo: this.route}))
    ),{dispatch: false})

}