import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormValidator } from 'src/app/core/util';
import { authFeature, loginActions } from '../core/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading$ : Observable<boolean>

  loginForm  = this.fb.group({
    email: ['', [Validators.required, Validators.email ],],
    password: ['', [Validators.required]]
    // password: ['', [Validators.required, FormValidator.validatePassword()]]
  })

  constructor(private readonly store: Store, private readonly fb: FormBuilder) {
    this.isLoading$ = store.select(authFeature.selectIsLoginLoading)
  }

  ngOnInit(): void {
    //this.store.dispatch(loginActions.login({email: "user@bonitasict.com", password: "password"}));
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.store.dispatch(loginActions.login({
        email: this.loginForm.value.email!, 
        password: this.loginForm.value.password! 
      }));
      // this.store.dispatch(loginActions.login({
      //   email: this.loginForm.value.email!, 
      //   password: 'password' 
      // }));
    }
  }

}
