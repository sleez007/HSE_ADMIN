import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectModel } from '../core/model';
import { manageProjectActions, manageProjectFeature } from './core/store';
import { OptionModel } from '../../core/model';
import { DateFormatter } from 'src/app/core/util';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  isLoading$: Observable<boolean>
  isEditingLoading$: Observable<boolean>
  isDeletingLoading$: Observable<boolean>
  projects$: Observable<ProjectModel[]>
  status$: Observable<OptionModel[]>

  constructor(private readonly store: Store) { 
    this.isLoading$ = store.select(manageProjectFeature.selectIsLoading);
    this.isEditingLoading$ = store.select(manageProjectFeature.selectIsLoadingEdit);
    this.isDeletingLoading$ = store.select(manageProjectFeature.selectIsLoadingDelete);
    this.projects$ = store.select(manageProjectFeature.selectProjects);
    this.status$ = store.select(manageProjectFeature.selectStatus)
  }

  ngOnInit(): void {
    this.store.dispatch(manageProjectActions.getAllProject());
  }

  format(dateString?: Date){
    if(!dateString) return 'Nill';
    return DateFormatter.dateToString(dateString)
  }


}
