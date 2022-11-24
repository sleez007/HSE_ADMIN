import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OptionModel } from 'src/app/features/admin/core/model';
import { StaffMedical } from '../../../../core/model';
import { createStaffMedicalActions, staffFeature } from '../../store';

@Component({
  selector: 'app-user-medical-form',
  templateUrl: './user-medical-form.component.html',
  styleUrls: ['./user-medical-form.component.scss']
})
export class UserMedicalFormComponent implements OnInit {

  bloodOptions$ : Observable<OptionModel[]>
  yesNo$: Observable<OptionModel[]>
  fitness$: Observable<OptionModel[]>
  genoType$: Observable<OptionModel[]>
  hivStat$: Observable<OptionModel[]>

  medicalForm = this.fb.group({
    dob: [''],
    dot: [''],
    bloodGroup: [''],
    expiryDate: [''],
    weight: [''],
    height: [''],
    genoType: [''],
    calculatedBMI: [''],
    hasUsedTyphoidVaccine: [''],
    cns: [''],
    chest: [''],
    lipidProfile: [''],
    fullBloodCount: [''],
    ecg: [''],
    hivScreening : [''],
    audiometry: [''],
    drugAndAlcoholTest: [''],
    cvs: [''],
    abd: [''],
    urinalysis: [''],
    chestXray: [''],
    hepScreening: [''],
    yellowFever: [''],
    overallEvaluation: [''],
    testExpirationDate: [''],
    scheduleNextMedical: [''],
    remindMe:[''],
  });

  constructor(private readonly store: Store, private readonly fb: FormBuilder) { 
    this.bloodOptions$ = store.select(staffFeature.selectBlood);
    this.yesNo$ = store.select(staffFeature.selectYesNo);
    this.fitness$ = store.select(staffFeature.selectFitness);
    this.genoType$ = store.select(staffFeature.selectGenoType);
    this.hivStat$ = store.select(staffFeature.selectHivScreen)
  }

  ngOnInit(): void {
    this.store.select(staffFeature.selectStaffMedicalData).subscribe(data => this.medicalForm.patchValue(data))
  }

  onSubmit(){
    if(this.medicalForm.valid){
      const formValue = this.medicalForm.value;
      const staffData: StaffMedical = {
        dob:formValue.dob ?? '',
        dot:formValue.dot ?? '',
        bloodGroup:formValue.bloodGroup ?? '',
        expiryDate:formValue.expiryDate ?? '',
        weight:formValue.weight ?? '',
        height:formValue.height ?? '',
        genoType:formValue.genoType ?? '',
        calculatedBMI:formValue.calculatedBMI ?? '',
        hasUsedTyphoidVaccine:formValue.hasUsedTyphoidVaccine ?? '',
        cns:formValue.cns ?? '',
        chest:formValue.chest ?? '',
        lipidProfile:formValue.lipidProfile ?? '',
        fullBloodCount:formValue.fullBloodCount ?? '',
        ecg:formValue.ecg ?? '',
        hivScreening :formValue.hivScreening ?? '',
        audiometry:formValue.audiometry ?? '',
        drugAndAlcoholTest:formValue.drugAndAlcoholTest ?? '',
        cvs:formValue.cvs ?? '',
        abd:formValue.abd ?? '',
        urinalysis:formValue.urinalysis ?? '',
        chestXray:formValue.chestXray ?? '',
        hepScreening:formValue.hepScreening ?? '',
        yellowFever:formValue.yellowFever ?? '',
        overallEvaluation:formValue.overallEvaluation ?? '',
        testExpirationDate:formValue.testExpirationDate ?? '',
        scheduleNextMedical:formValue.scheduleNextMedical ?? '',
        remindMe:formValue.remindMe ??'',
      };
      this.store.dispatch(createStaffMedicalActions.storeStaffData(staffData));
    }
  }

}
