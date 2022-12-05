import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HseIncidentRoutingModule } from './hse-incident-routing.module';
import { HseIncidentComponent } from './hse-incident.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeUiModule } from 'src/app/prime-ui/prime-ui.module';
import { StoreModule } from '@ngrx/store';
import { IncidentEffect, incidentFeature } from './core/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    HseIncidentComponent
  ],
  imports: [
    CommonModule,
    HseIncidentRoutingModule,
    SharedModule,
    PrimeUiModule,
    StoreModule.forFeature(incidentFeature),
    EffectsModule.forFeature([IncidentEffect])
  ]
})
export class HseIncidentModule { }
