import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllStaffsComponent } from './all-staffs.component';

const routes: Routes = [{ path: '', component: AllStaffsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllStaffsRoutingModule { }
