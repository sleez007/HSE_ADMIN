import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OptionModel } from '../../core/model';
import { projectFeature } from './core/store';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  status$ : Observable<OptionModel[]>;
  isLoading$: Observable<boolean>;

  projectForm = this.fb.group({
    project: ['', [Validators.required]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]],
    status: ['', [Validators.required]]
  })

  constructor(private readonly store: Store, private readonly fb: FormBuilder) { 
    this.status$ = store.select(projectFeature.selectStatus)
    this.isLoading$ = store.select(projectFeature.selectIsLoading)
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.table(this.projectForm.value)
  }

}
