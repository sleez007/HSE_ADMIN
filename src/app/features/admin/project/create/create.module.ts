import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeUiModule } from 'src/app/prime-ui/prime-ui.module';
import { StoreModule } from '@ngrx/store';
import { ProjectEffect, projectFeature } from './core/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    SharedModule,
    PrimeUiModule,
    StoreModule.forFeature(projectFeature),
    EffectsModule.forFeature([ProjectEffect])
  ]
})
export class CreateModule { }
