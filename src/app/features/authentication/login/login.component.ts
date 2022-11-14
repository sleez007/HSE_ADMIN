import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginActions } from '../core/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loginActions.login({email: "user@bonitasict.com", password: "password"}));
  }

}
