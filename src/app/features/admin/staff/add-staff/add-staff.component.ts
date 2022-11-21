import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StepperModel } from '../core/model';
import { staffFeature } from './core/store';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  steps$ : Observable<StepperModel[]>

  constructor(private readonly store: Store) { 
    this.steps$ = store.select(staffFeature.selectStepper)
  }

  ngOnInit(): void {
  }

}
