import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  projectForm = this.fb.group({
    projectTitle: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    status: ['', [Validators.required]]
  })

  constructor(private readonly store: Store, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    
  }

}
