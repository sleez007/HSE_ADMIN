import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StaffDetail } from './core/model';
import { staffDetailFeature } from './core/store';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {
  userBasic$ : Observable<StaffDetail[]>
  medicalBasic$: Observable<StaffDetail[]>
  keyMedical$: Observable<StaffDetail[]>
  personalData$: Observable<StaffDetail[]>
  isLoading$: Observable<boolean>

  constructor(private readonly store: Store) { 
    this.userBasic$ = store.select(staffDetailFeature.selectUserBasic);
    this.medicalBasic$ = store.select(staffDetailFeature.selectMedicalBasic);
    this.keyMedical$ = store.select(staffDetailFeature.selectKeyMedical);
    this.personalData$ = store.select(staffDetailFeature.selectPersonalData);
    this.isLoading$ = store.select(staffDetailFeature.selectIsLoading)
  }

  ngOnInit(): void {}

}
