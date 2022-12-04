import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OptionModel } from '../../core/model';
import { ProjectModel } from '../core/model';
import { createProjectActions, projectFeature } from './core/store';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  status$ : Observable<OptionModel[]>;
  isLoading$: Observable<boolean>;
  isSaved$: Observable<boolean>

  projectForm = this.fb.group({
    projectTitle: ['', [Validators.required]],
    startDuration: ['', [Validators.required]],
    endDuration: ['', [this.validateEndDateConditionally]],
    isCompleted: ['', [Validators.required]]
  })

  constructor(private readonly store: Store, private readonly fb: FormBuilder) { 
    this.status$ = store.select(projectFeature.selectStatus);
    this.isLoading$ = store.select(projectFeature.selectIsLoading);
    this.isSaved$ = store.select(projectFeature.selectIsSaved)
  }

  ngOnInit(): void {
    this.isSaved$.subscribe({next : (stat) => {
      if(stat) this.projectForm.reset();
    }});
    this.projectForm.get('isCompleted')?.valueChanges.subscribe({next: v => this.projectForm.get('endDuration')?.updateValueAndValidity()})
  }

  onSubmit(){
    console.table(this.projectForm.value)
    if(this.projectForm.valid){
      const { projectTitle, startDuration,endDuration, isCompleted } = this.projectForm.value;
      const model: ProjectModel = {projectTitle: projectTitle!, startDuration: startDuration ?? null, endDuration: endDuration ?? null, isCompleted: isCompleted!, projectId: null }
      this.store.dispatch(createProjectActions.addProject(model))
    }
  }

  private validateEndDateConditionally(formControl: AbstractControl) {
    if(!formControl.parent) return null;
    console.log(formControl.parent.get('isCompleted')!.value)
    if (formControl.parent.get('isCompleted')!.value == false) {
      return Validators.required(formControl); 
    }
    return null;
  }

}