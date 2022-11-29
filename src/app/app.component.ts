import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { rehydrateUserAction } from './features/authentication/core/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private readonly store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(rehydrateUserAction())
    // Initiate initial rehydrate here

  }

}
