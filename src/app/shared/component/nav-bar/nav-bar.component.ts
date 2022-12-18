import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticatedData } from 'src/app/features/authentication/core/model';
import { authFeature } from 'src/app/features/authentication/core/store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user$: Observable<AuthenticatedData | null>

  @Input() pageTitle: string = '';

  constructor(private readonly store: Store) {
    this.user$ = store.select(authFeature.selectUser)
   }

  ngOnInit(): void {
  }

}
