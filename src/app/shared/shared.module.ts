import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectFilterComponent } from './component/project-filter/project-filter.component';
import { PrimeUiModule } from '../prime-ui/prime-ui.module';
import { IncidentOverviewTableComponent } from './component/incident-overview-table/incident-overview-table.component';



@NgModule({
  declarations: [
    ProjectFilterComponent,
    IncidentOverviewTableComponent,
  ],
  imports: [
    CommonModule,
    PrimeUiModule,
    ReactiveFormsModule,
  ],
  exports: [ReactiveFormsModule, ProjectFilterComponent, IncidentOverviewTableComponent]
})
export class SharedModule { }
