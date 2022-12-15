import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllStaffsRoutingModule } from './all-staffs-routing.module';
import { AllStaffsComponent } from './all-staffs.component';
import { StaffCardComponent } from './staff-card/staff-card.component';
import { StoreModule } from '@ngrx/store';
import { StaffsEffect, staffsFeature } from './core/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AllStaffsComponent,
    StaffCardComponent
  ],
  imports: [
    CommonModule,
    AllStaffsRoutingModule,
    StoreModule.forFeature(staffsFeature),
    EffectsModule.forFeature([StaffsEffect]),
    SharedModule
  ]
})
export class AllStaffsModule { }
