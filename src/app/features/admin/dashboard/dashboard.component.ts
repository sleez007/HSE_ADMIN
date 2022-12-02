import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OptionModel } from '../core/model';
import { OfficeModel, ProjectModel, SwitchState } from './core/model';
import { dashboardActions, dashboardFeature } from './core/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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

  incidents : {category: string, target: number, ph: number, awka: number, project: number, total: number}[] = [
    {category: "Unsafe Act", target: 10, ph: 6, awka: 3, project: 4, total: 13},
    {category: "Near Miss", target: 10, ph: 4, awka: 3, project: 5, total: 12},
    {category: "Unsafe Condition", target: 13, ph: 5, awka: 1, project: 7, total: 13},
    {category: "Restricted Work Case", target: 15, ph: 7, awka: 5, project: 3, total: 15},
    {category: "Lost Time Injury", target: 5, ph: 1, awka: 1, project: 3, total: 3},
    {category: "Road Traffic Accident", target: 0, ph: 0, awka: 0, project: 0, total: 0}
  ];

  constructor(private readonly store: Store) { 
    this.isLoadingOffice$ = store.select(dashboardFeature.selectIsLoadingOffice);
    this.isLoadingProject$ = store.select(dashboardFeature.selectIsLoadingProject);
    this.isLoadingProjects$ = store.select(dashboardFeature.selectIsLoadingProjectOptions);
    this.selectedSwitch$ = store.select(dashboardFeature.selectSelectedSwitch);
    this.projectValue$ = store.select(dashboardFeature.selectSelectedProjectOption);
    this.projectOptions$ = store.select(dashboardFeature.selectProjectOptions);
    this.officeHead$ = store.select(dashboardFeature.selectOfficeHead);
    this.projectHead$ = store.select(dashboardFeature.selectProjectHead);
    this.officeData$ = store.select(dashboardFeature.selectOfficeData);
    this.projectData$ = store.select(dashboardFeature.selectProjectData)
  }

  ngOnInit(): void {
    this.store.dispatch(dashboardActions.fetchOffice());
  }

  onFilterHandler(data: {start: string | Date, end: string | Date, }) {
    this.store.dispatch(dashboardActions.filter(data));
  }

  onToggleSwitchHandler(data: SwitchState) {
    this.store.dispatch(dashboardActions.switch({data}));
  }

  onFilterProject(value: string | number) {
    this.store.dispatch(dashboardActions.toggleProject({id: value}))
  }

}
