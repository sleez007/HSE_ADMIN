import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllStaffsRoutingModule } from './all-staffs-routing.module';
import { AllStaffsComponent } from './all-staffs.component';


@NgModule({
  declarations: [
    AllStaffsComponent
  ],
  imports: [
    CommonModule,
    AllStaffsRoutingModule
  ]
})
export class AllStaffsModule { }
