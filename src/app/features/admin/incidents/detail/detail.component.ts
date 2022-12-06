import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DetailModel } from './core/model';
import { detailActions, detailFeature } from './core/store';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  clonedProjects: DetailModel[] = []
  projectData$ : Observable<DetailModel[]>
  isLoading$: Observable<boolean>
  isEditingLoading$: Observable<boolean>
  isDeletingLoading$: Observable<boolean>
  currentId$: Observable<number | string>

  constructor(private readonly store: Store, private confirmationService: ConfirmationService,) { 
    this.projectData$ = this.store.select(detailFeature.selectItemDetail);
    this.isLoading$ = this.store.select(detailFeature.selectIsLoading)
    this.isEditingLoading$ = store.select(detailFeature.selectIsLoadingEdit);
    this.isDeletingLoading$ = store.select(detailFeature.selectIsLoadingDelete);
    this.currentId$ = store.select(detailFeature.selectSelectedId)
  }

  ngOnInit(): void {
    this.projectData$.subscribe({next: p => (this.clonedProjects = [...p.map(i => ({...i}))])})
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
