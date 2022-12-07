import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { OptionModel } from '../../core/model';
import { DetailModel } from './core/model';
import { detailActions, detailFeature } from './core/store';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  pgTitle: string = '';
  clonedProjects: DetailModel[] = [];
  projectData$ : Observable<DetailModel[]>;
  isLoading$: Observable<boolean>;
  isEditingLoading$: Observable<boolean>;
  isDeletingLoading$: Observable<boolean>;
  currentId$: Observable<number | string>;
  users$: Observable<OptionModel[]>;
  priority$: Observable<OptionModel[]>;
  status$: Observable<OptionModel[]>;


  constructor(private readonly store: Store, private readonly confirmationService: ConfirmationService, private readonly route: ActivatedRoute) { 
    this.projectData$ = this.store.select(detailFeature.selectItemDetail);
    this.isLoading$ = this.store.select(detailFeature.selectIsLoading)
    this.isEditingLoading$ = store.select(detailFeature.selectIsLoadingEdit);
    this.isDeletingLoading$ = store.select(detailFeature.selectIsLoadingDelete);
    this.currentId$ = store.select(detailFeature.selectSelectedId);
    this.users$ = store.select(detailFeature.selectUsers);
    this.priority$ = store.select(detailFeature.selectPriority);
    this.status$ = store.select(detailFeature.selectStatus)
  }

  ngOnInit(): void {
    this.pgTitle = this.route.snapshot.paramMap.get('category')?.split('-').join(' ') ?? 'Unknown Category';
    this.store.dispatch(detailActions.fetchUsers());
    this.projectData$.subscribe({next: p => (this.clonedProjects = [...p.map(i => ({...i}))])});
  }

  deletePopUp(project: DetailModel){
    this.confirmationService.confirm({
      message: `Confirm you want to delete the incident with ID '${project.reportId}'?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.store.dispatch(detailActions.deleteIncident({id: project.id!}))
      },
      reject: (type: any) => {}
    });
  }

  editRow(project: DetailModel) {
    this.store.dispatch(detailActions.editIncident({...project}))
  }
}
