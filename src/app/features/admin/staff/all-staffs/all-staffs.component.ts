import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StaffData } from '../core/model';
import { StaffsActions, staffsFeature } from './core/store';

@Component({
  selector: 'app-all-staffs',
  templateUrl: './all-staffs.component.html',
  styleUrls: ['./all-staffs.component.scss']
})
export class AllStaffsComponent implements OnInit {

  isLoading$ : Observable<boolean>
  staffs$: Observable<StaffData[]>



  constructor(private readonly store: Store) { 
    this.isLoading$ = this.store.select(staffsFeature.selectIsLoading);
    this.staffs$ = this.store.select(staffsFeature.selectStaffList);
  }

  ngOnInit(): void {
    this.store.dispatch(StaffsActions.getStaffs());

  }

}
