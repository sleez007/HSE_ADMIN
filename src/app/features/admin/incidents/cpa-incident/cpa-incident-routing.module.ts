import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpaIncidentComponent } from './cpa-incident.component';

const routes: Routes = [{ path: '', component: CpaIncidentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpaIncidentRoutingModule { }
