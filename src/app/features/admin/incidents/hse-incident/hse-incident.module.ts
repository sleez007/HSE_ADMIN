import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HseIncidentRoutingModule } from './hse-incident-routing.module';
import { HseIncidentComponent } from './hse-incident.component';


@NgModule({
  declarations: [
    HseIncidentComponent
  ],
  imports: [
    CommonModule,
    HseIncidentRoutingModule
  ]
})
export class HseIncidentModule { }
