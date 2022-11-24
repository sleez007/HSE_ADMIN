import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeUiModule } from 'src/app/prime-ui/prime-ui.module';
import { StoreModule } from '@ngrx/store';
import { projectFeature } from './core/store';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    SharedModule,
    PrimeUiModule,
    StoreModule.forFeature(projectFeature)
  ]
})
export class CreateModule { }
