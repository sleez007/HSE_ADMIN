import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffDetailRoutingModule } from './staff-detail-routing.module';
import { StaffDetailComponent } from './staff-detail.component';


@NgModule({
  declarations: [
    StaffDetailComponent
  ],
  imports: [
    CommonModule,
    StaffDetailRoutingModule
  ]
})
export class StaffDetailModule { }
