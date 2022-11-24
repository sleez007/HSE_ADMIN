import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStaffRoutingModule } from './add-staff-routing.module';
import { AddStaffComponent } from './add-staff.component';
import { PrimeUiModule } from 'src/app/prime-ui/prime-ui.module';
import { StoreModule } from '@ngrx/store';
import { StaffEffect, staffFeature } from './core/store';
import { UserDataFormComponent } from './core/component/user-data-form/user-data-form.component';
import { UserMedicalFormComponent } from './core/component/user-medical-form/user-medical-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AddStaffComponent,
    UserDataFormComponent,
    UserMedicalFormComponent
  ],
  imports: [
    CommonModule,
    AddStaffRoutingModule,
    StoreModule.forFeature(staffFeature),
    EffectsModule.forFeature([StaffEffect]),
    SharedModule,
    PrimeUiModule
  ]
})
export class AddStaffModule { }
