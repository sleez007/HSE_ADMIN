import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeUiModule } from 'src/app/prime-ui/prime-ui.module';
import { StoreModule } from '@ngrx/store';
import { DashboardEffect, dashboardFeature } from './core/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    PrimeUiModule,
    StoreModule.forFeature(dashboardFeature),
    EffectsModule.forFeature([DashboardEffect])
  ]
})
export class DashboardModule { }
