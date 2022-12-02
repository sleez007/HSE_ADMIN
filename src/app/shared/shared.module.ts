import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectFilterComponent } from './component/project-filter/project-filter.component';
import { PrimeUiModule } from '../prime-ui/prime-ui.module';
import { IncidentOverviewTableComponent } from './component/incident-overview-table/incident-overview-table.component';
import { LoadingIndicatorComponent } from './component/loading-indicator/loading-indicator.component';



@NgModule({
  declarations: [
    ProjectFilterComponent,
    IncidentOverviewTableComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    CommonModule,
    PrimeUiModule,
    ReactiveFormsModule,
  ],
  exports: [ReactiveFormsModule, ProjectFilterComponent, IncidentOverviewTableComponent, LoadingIndicatorComponent]
})
export class SharedModule { }
