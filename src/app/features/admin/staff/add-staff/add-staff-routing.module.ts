import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStaffComponent } from './add-staff.component';
import { UserDataFormComponent } from './core/component/user-data-form/user-data-form.component';
import { UserMedicalFormComponent } from './core/component/user-medical-form/user-medical-form.component';

const routes: Routes = [
  { 
    path: '', 
    component: AddStaffComponent, 
    children: [
      {path:'medical', component: UserMedicalFormComponent },
      {path:'', component: UserDataFormComponent}
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddStaffRoutingModule { }
