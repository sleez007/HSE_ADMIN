import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffDetailRoutingModule } from './staff-detail-routing.module';
import { StaffDetailComponent } from './staff-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeUiModule } from 'src/app/prime-ui/prime-ui.module';


@NgModule({
  declarations: [
    StaffDetailComponent
  ],
  imports: [
    CommonModule,
    StaffDetailRoutingModule,
    SharedModule,
    PrimeUiModule
  ]
})
export class StaffDetailModule { }
