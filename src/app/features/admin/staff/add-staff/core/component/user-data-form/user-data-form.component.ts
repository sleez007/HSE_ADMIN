import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.scss']
})
export class UserDataFormComponent implements OnInit {
  genderOptions = [
    {name: 'Male', code: 'male'},
    {name: 'Female', code: 'female'}
  ];

  staffForm  = this.fb.group({
    firstName: ['',[Validators.required] ],
    lastName: ['',[Validators.required] ],
    email: ['', [Validators.required, Validators.email ],],
    phoneNumber: ['',[Validators.required] ],
    gender: ['',[Validators.required] ],
    position: ['',[Validators.required] ],
    entity: ['',[Validators.required] ],
    location: ['',[Validators.required] ],
    role: ['',[Validators.required] ],
    supervisor: ['',[Validators.required] ],
  })

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
