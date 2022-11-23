import { createFeature, createReducer, on } from "@ngrx/store"
import { OptionModel } from "src/app/features/admin/core/model";
import { StaffData, StaffMedical, StepperModel } from "../../../../core/model"

import { createStaffActions, createStaffMedicalActions } from "../action/staff.action"

export  interface StaffCreationState {
    stepper: StepperModel[];
    staffData:StaffData,
    staffMedicalData: StaffMedical,
    genderOptions: OptionModel[],
    roleOptions: OptionModel[];
    entityOptions: OptionModel[];
    location: OptionModel[];
    supervisor: OptionModel[]
};

export const staffInitialState: StaffCreationState = {
    stepper : [
        {label: 'Basic Information', routerLink: './'},
        {label: 'Medical Information', routerLink: './medical'}
    ],
    staffData: {
        firstName: 'Kingso',
        lastName: 'Etoka',
        email: 'kingsley@ict.com',
        phoneNumber: '08038070818',
        gender: 'male',
        position: 'App Development',
        entity: 'bms',
        location: 'ph',
        role: 'admin',
        supervisor: 'bede'
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
    },
    genderOptions: [
        {name: 'Male', code: 'male'},
        {name: 'Female', code: 'female'}
    ],
    roleOptions: [
        {name: 'Employee', code: 'employee'},
        {name: 'Supervisor', code: 'supervisor'},
        {name: 'Admin', code: 'admin'},
        {name: 'Director', code: 'director'},
    ],
    entityOptions: [
        { name: 'BMS', code: 'bms'},
        { name: 'BICT', code: 'bict'},
        { name: 'Energy', code: 'energy'}
    ],
    location: [
        {name: 'Port Harcourt', code: 'ph'},
        {name: 'Awka', code: 'awka'}
    ],
    supervisor: [
        { name: 'Ivan', code: 'ivan'},
        { name: 'Somto',code: 'somto'},
        { name: 'Bede', code: 'bede'}
    ]

}



export const staffFeature = createFeature({
    name: 'staffs',
    reducer: createReducer(
        staffInitialState,
        on(createStaffActions.storeStaffData, (state,props ) => ({...state, staffData: {...props}})),
        on(createStaffMedicalActions.storeStaffData, (state, props) => ({...state, staffMedicalData: props}))
    )
})
