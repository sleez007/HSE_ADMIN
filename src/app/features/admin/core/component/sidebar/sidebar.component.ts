import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { adminActions, adminFeature } from '../../store';
import { ParentNodeModel } from '../../model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu$ : Observable<ParentNodeModel[]>;

  constructor(private readonly store: Store) { 
    this.menu$ = store.select(adminFeature.selectSideMenu)
  }

  ngOnInit(): void {
  }
  
  toggleMenu(index: number){
    this.store.dispatch(adminActions.toggleMenu({nodeIndex: index}))
  }

}
