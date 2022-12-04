import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { StoreModule } from '@ngrx/store';
import { ManageProjectEffect, manageProjectFeature } from './core/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeUiModule } from 'src/app/prime-ui/prime-ui.module';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    StoreModule.forFeature(manageProjectFeature),
    EffectsModule.forFeature([ManageProjectEffect]),
    SharedModule,
    PrimeUiModule
  ]
})
export class ManageModule { }
