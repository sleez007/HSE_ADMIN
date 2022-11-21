import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectFilterComponent } from './component/project-filter/project-filter.component';
import { PrimeUiModule } from '../prime-ui/prime-ui.module';



@NgModule({
  declarations: [
    ProjectFilterComponent,
  ],
  imports: [
    CommonModule,
    PrimeUiModule,
    ReactiveFormsModule,
  ],
  exports: [ReactiveFormsModule, ProjectFilterComponent]
})
export class SharedModule { }
