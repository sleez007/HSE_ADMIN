import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeUiModule } from 'src/app/prime-ui/prime-ui.module';
import { DetailEffect, detailFeature } from './core/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
    SharedModule,
    PrimeUiModule,
    StoreModule.forFeature(detailFeature),
    EffectsModule.forFeature([DetailEffect]),
  ]
})
export class DetailModule { }
