import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OptionModel } from '../../core/model';
import { SwitchState, OfficeModel, ProjectModel } from '../../dashboard/core/model';
import { incidentActions, incidentFeature } from './core/store';


@Component({
  selector: 'app-hse-incident',
  templateUrl: './hse-incident.component.html',
  styleUrls: ['./hse-incident.component.scss']
})
export class HseIncidentComponent implements OnInit {

  isLoadingOffice$: Observable<boolean>;
  isLoadingProject$: Observable<boolean>;
  isLoadingProjects$: Observable<boolean>;
  selectedSwitch$: Observable<SwitchState>;
  projectValue$: Observable<string | number>;
  projectOptions$: Observable<OptionModel[]>;
  officeHead$: Observable<string[]>;
  projectHead$: Observable<string[]>;
  officeData$: Observable<OfficeModel[]>;
  projectData$: Observable<ProjectModel[]>;

  constructor(private readonly store: Store) { 
    this.isLoadingOffice$ = store.select(incidentFeature.selectIsLoadingOffice);
    this.isLoadingProject$ = store.select(incidentFeature.selectIsLoadingProject);
    this.isLoadingProjects$ = store.select(incidentFeature.selectIsLoadingProjectOptions);
    this.selectedSwitch$ = store.select(incidentFeature.selectSelectedSwitch);
    this.projectValue$ = store.select(incidentFeature.selectSelectedProjectOption);
    this.projectOptions$ = store.select(incidentFeature.selectProjectOptions);
    this.officeHead$ = store.select(incidentFeature.selectOfficeHead);
    this.projectHead$ = store.select(incidentFeature.selectProjectHead);
    this.officeData$ = store.select(incidentFeature.selectOfficeData);
    this.projectData$ = store.select(incidentFeature.selectProjectData)
  }

  ngOnInit(): void {
    this.store.dispatch(incidentActions.fetchOffice());
  }

  onFilterHandler(data: {start: string | Date, end: string | Date, }) {
    this.store.dispatch(incidentActions.filter(data));
  }

  onToggleSwitchHandler(data: SwitchState) {
    this.store.dispatch(incidentActions.switch({data}));
    if(data == SwitchState.PROJECT) {
      this.store.dispatch(incidentActions.fetchProject());
    }
  }

  onFilterProject(value: string | number) {
    this.store.dispatch(incidentActions.toggleProject({id: value}))
  }

}
