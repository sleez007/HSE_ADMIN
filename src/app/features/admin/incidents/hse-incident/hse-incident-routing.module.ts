import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HseIncidentComponent } from './hse-incident.component';

const routes: Routes = [{ path: '', component: HseIncidentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HseIncidentRoutingModule { }
