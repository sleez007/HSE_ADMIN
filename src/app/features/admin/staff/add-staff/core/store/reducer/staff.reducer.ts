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
    supervisor: OptionModel[];
    blood: OptionModel[];
    genoType: OptionModel[];
    yesNo: OptionModel[];
    fitness: OptionModel[];
    hivScreen: OptionModel[];
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
        overallEvaluation: '',
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
    ],
    blood: [
        { name: 'A+', code: 'A+'},
        { name: 'A-',code: 'A-'},
        { name: 'B+', code: 'B+'},
        { name: 'B-', code: 'B-'},
        { name: 'O+', code: 'O+'},
        { name: 'O-', code: 'O-'},
        { name: 'AB+', code: 'AB+'},
        { name: 'AB-', code: 'AB-'},
    ],
    genoType: [
        { name: 'AA', code: 'AA'},
        { name: 'A-',code: 'A-'},
        { name: 'B+', code: 'B+'},
    ],
    yesNo: [
        { name: 'Yes', code: 'yes' },
        { name: 'No', code: 'no'},
    ],
    fitness: [
        { name: 'Fit to work', code: 'Fit to work' },
        { name: 'Not Fit to work', code: 'Not Fit to work' },
        { name: 'Not Conducted', code: 'Fit to work' },
    ],
    hivScreen: [
        { name: 'Negative', code: 'negative' },
        { name: 'Positive', code: 'positive' },
        { name: 'Nil', code: 'Nil' },
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
