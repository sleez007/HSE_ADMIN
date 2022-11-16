import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormValidator } from 'src/app/core/util';
import { loginActions } from '../core/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm  = this.fb.group({
    email: ['', [Validators.required, Validators.email ],],
    password: ['', [Validators.required, FormValidator.validatePassword()]]
  })

  constructor(private readonly store: Store, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.store.dispatch(loginActions.login({email: "user@bonitasict.com", password: "password"}));
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.store.dispatch(loginActions.login({
        email: this.loginForm.value.email!, 
        password: this.loginForm.value.password! 
      }));
    }
  }

}
