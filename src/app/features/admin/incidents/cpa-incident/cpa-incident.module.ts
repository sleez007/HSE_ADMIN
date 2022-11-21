import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpaIncidentRoutingModule } from './cpa-incident-routing.module';
import { CpaIncidentComponent } from './cpa-incident.component';


@NgModule({
  declarations: [
    CpaIncidentComponent
  ],
  imports: [
    CommonModule,
    CpaIncidentRoutingModule
  ]
})
export class CpaIncidentModule { }
