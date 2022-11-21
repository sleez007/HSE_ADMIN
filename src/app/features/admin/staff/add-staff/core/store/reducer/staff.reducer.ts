import { createFeature, createReducer, on } from "@ngrx/store"
import { StaffData, StaffMedical, StepperModel } from "../../../../core/model"

import { createStaffActions, createStaffMedicalActions } from "../action/staff.action"

export  interface StaffCreationState {
    stepper: StepperModel[];
    staffData:StaffData,
    staffMedicalData: StaffMedical
};

export const staffInitialState: StaffCreationState = {
    stepper : [
        {label: 'Basic Information', routerLink: './'},
        {label: 'Medical Information', routerLink: '/medicals'}
    ],
    staffData: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        position: '',
        entity: '',
        location: '',
        role: '',
        supervisor: ''
    },
    staffMedicalData: {
        dob: '',
        dot: '',
        bloodGroup: '',
        expiryDate: '',
        weight: '',
        height: '',
        genoType: '',
        calculatedBMI: '',
        hasUsedTyphoidVaccine: '',
        cns: '',
        chest: '',
        lipidProfile: '',
        fullBloodCount: '',
        ecg: '',
        hivScreening : '',
        audiometry: '',
        drugAndAlcoholTest: '',
        cvs: '',
        abd: '',
        urinalysis: '',
        chestXray: '',
        hepScreening: '',
        yellowFever: '',
        overallEducation: '',
        testExpirationDate: '',
        scheduleNextMedical: '',
        remindMe:'',
    }

}



export const staffFeature = createFeature({
    name: 'staffs',
    reducer: createReducer(
        staffInitialState,
        on(createStaffActions.storeStaffData, (state,props ) => ({...state, staffData: {...props}})),
        on(createStaffMedicalActions.storeStaffData, (state, props) => ({...state, staffMedicalData: props}))
    )
})
