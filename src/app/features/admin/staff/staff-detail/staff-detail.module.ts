import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffDetailRoutingModule } from './staff-detail-routing.module';
import { StaffDetailComponent } from './staff-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeUiModule } from 'src/app/prime-ui/prime-ui.module';
import { StoreModule } from '@ngrx/store';
import { StaffDetailEffect, staffDetailFeature } from './core/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    StaffDetailComponent
  ],
  imports: [
    CommonModule,
    StaffDetailRoutingModule,
    SharedModule,
    PrimeUiModule,
    StoreModule.forFeature(staffDetailFeature),
    EffectsModule.forFeature([StaffDetailEffect])
  ]
})
export class StaffDetailModule { }
