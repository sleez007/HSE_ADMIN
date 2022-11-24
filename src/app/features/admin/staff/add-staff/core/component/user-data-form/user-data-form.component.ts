import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OptionModel } from 'src/app/features/admin/core/model';
import { StaffData } from '../../../../core/model';
import { createStaffActions, staffFeature } from '../../store';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.scss']
})
export class UserDataFormComponent implements OnInit {
  genderOptions$ : Observable<OptionModel[]>;

  roleOption$: Observable<OptionModel[]>;

  locationOption$: Observable<OptionModel[]>

  entityOption$: Observable<OptionModel[]>

  supervisorOption$: Observable<OptionModel[]>

  staffForm  = this.fb.group({
    firstName: ['',[Validators.required] ],
    lastName: ['',[Validators.required] ],
    email: ['', [Validators.required, Validators.email ],],
    phoneNumber: ['',[Validators.required] ],
    gender: ['',[Validators.required] ],
    position: ['',[Validators.required] ],
    entity: ['',[Validators.required] ],
    location: ['',[Validators.required] ],
    role: ['',[Validators.required] ],
    supervisor: ['',[Validators.required] ],
  })

  constructor(private readonly fb: FormBuilder, private readonly store: Store ) { 
    this.genderOptions$ = this.store.select(staffFeature.selectGenderOptions);
    this.roleOption$ = this.store.select(staffFeature.selectRoleOptions);
    this.locationOption$ = this.store.select(staffFeature.selectLocation);
    this.entityOption$ = this.store.select(staffFeature.selectEntityOptions);
    this.supervisorOption$ = this.store.select(staffFeature.selectSupervisor)
  }

  ngOnInit(): void {
    this.store.select(staffFeature.selectStaffData).subscribe((data) => this.staffForm.patchValue(data))
  }

  onSubmit(){
    if(this.staffForm.valid){
      const formValue = this.staffForm.value;
      const staffData: StaffData = {
        firstName:  formValue.firstName ?? '',
        lastName: formValue.lastName ?? '',
        email: formValue.email ?? '',
        phoneNumber: formValue.phoneNumber ?? '',
        gender: formValue.gender ?? '',
        position: formValue.position ?? '',
        entity: formValue.entity ?? '',
        location: formValue.location ?? '',
        role: formValue.role ?? '',
        supervisor: formValue.supervisor ?? ''

      }
      this.store.dispatch(createStaffActions.storeStaffData(staffData));
    }
  }

}
