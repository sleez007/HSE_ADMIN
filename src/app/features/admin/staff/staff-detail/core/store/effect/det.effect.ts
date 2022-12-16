import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { catchError, filter, map, of, retry, switchMap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { ToastService } from "src/app/core/service";
import { staffEndpoints } from "../../../../core/constants";
import { StaffDetail } from "../../model";
import { StaffDetailEffectAction } from "../action/det.action";

type bag = {ui: StaffDetail[], bm: StaffDetail[], km: StaffDetail[],ps: StaffDetail[]};

@Injectable()
export class StaffDetailEffect {
    constructor(
        private readonly action$: Actions, 
        private readonly networkHelper: NetworkHelperService, 
        private readonly router: Router, 
        private readonly route: ActivatedRoute,
        private readonly store: Store,
        private toaster: ToastService
    ) {}

    getDetail$ = createEffect(() => this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((r: RouterNavigatedAction) => r.payload.routerState.url.startsWith('/dashboard/staff-detail')),
        map((r: RouterNavigatedAction) =>{
           const d: any = r.payload.routerState;
           return d['params']['id'];
        } ),
        switchMap((data) => this.networkHelper.get<any[]>(staffEndpoints.all_user+ '/' + data).pipe(
            map((response) => StaffDetailEffectAction.getStaffDetailsSuccess(this.mapResponse(response))),
            retry(3),
            catchError((error: HttpErrorResponse) => of(StaffDetailEffectAction.getStaffDetailFailure({message: error.error['message'], statusCode: error.status })))
        ))
    ))

    mapResponse(data:any): bag {
        return {
            ui :[
                {firstKey: 'First Name', secondKey: data.first_name, thirdKey: 'Email Address', fourthKey : data.email, fifthKey: null, sixthKey: null},
                {firstKey: 'Last Name', secondKey: data.last_name, thirdKey: 'Gender', fourthKey : data.gender, fifthKey: null, sixthKey: null},
                {firstKey: 'Phone Number', secondKey: data.last_name, thirdKey: 'Entity', fourthKey : data.gender, fifthKey: null, sixthKey: null},
                {firstKey: 'Position', secondKey: data.last_name, thirdKey: 'Supervisor', fourthKey : data.gender, fifthKey: null, sixthKey: null},
            ],
            bm: [
                {firstKey: 'Date of Birth', secondKey: data.first_name, thirdKey: 'Weight', fourthKey : data.email, fifthKey: null, sixthKey: null},
                {firstKey: 'Date of Test', secondKey: data.last_name, thirdKey: 'Genotype', fourthKey : data.gender, fifthKey: null, sixthKey: null},
                {firstKey: 'Blood Group', secondKey: data.last_name, thirdKey: 'Typhoid Vaccine', fourthKey : data.gender, fifthKey: null, sixthKey: null},
                {firstKey: 'Expiry Date', secondKey: data.last_name, thirdKey: 'Calculated BMI', fourthKey : data.gender, fifthKey: null, sixthKey: null},
            ],
            km: [
                {firstKey: 'CNS', secondKey: data.first_name, thirdKey: 'Full Blood Count', fourthKey : data.email, fifthKey: 'Drugs and Alcohol Test', sixthKey: null},
                {firstKey: 'Chest', secondKey: data.last_name, thirdKey: 'Audiometry', fourthKey : data.gender, fifthKey: 'ABD', sixthKey: null},
                {firstKey: 'Lipids Profile', secondKey: data.last_name, thirdKey: 'ECG', fourthKey : data.gender, fifthKey: 'Urinalysis', sixthKey: null},
                {firstKey: 'Chest Xray', secondKey: data.last_name, thirdKey: 'CVS', fourthKey : data.gender, fifthKey: 'Yellow Fever', sixthKey: null},
                {firstKey: 'Hepatitis Screening', secondKey: data.last_name, thirdKey: '', fourthKey : '', fifthKey: '', sixthKey: ''},
            ],
            ps: [
                {firstKey: 'Overall Evaluation', secondKey: data.first_name, thirdKey: 'Weight', fourthKey : data.email, fifthKey: null, sixthKey: null},
                {firstKey: 'Test Expiration Date', secondKey: data.last_name, thirdKey: 'Genotype', fourthKey : data.gender, fifthKey: null, sixthKey: null},
                {firstKey: 'Schedule Next Medical', secondKey: data.last_name, thirdKey: 'Typhoid Vaccine', fourthKey : data.gender, fifthKey: null, sixthKey: null},
                {firstKey: 'Remind Me', secondKey: data.last_name, thirdKey: 'Calculated BMI', fourthKey : data.gender, fifthKey: null, sixthKey: null},
            ]
        }
    }

}