import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectFilterComponent } from './component/project-filter/project-filter.component';
import { PrimeUiModule } from '../prime-ui/prime-ui.module';
import { IncidentOverviewTableComponent } from './component/incident-overview-table/incident-overview-table.component';
import { LoadingIndicatorComponent } from './component/loading-indicator/loading-indicator.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    ProjectFilterComponent,
    IncidentOverviewTableComponent,
    LoadingIndicatorComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    PrimeUiModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ReactiveFormsModule, ProjectFilterComponent, IncidentOverviewTableComponent, LoadingIndicatorComponent, FormsModule, NavBarComponent]
})
export class SharedModule { }
