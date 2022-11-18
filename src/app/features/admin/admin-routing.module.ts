import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/component/layout/layout.component';
const routes: Routes = [
  { 
    path: '', component: LayoutComponent ,
    title: 'Mad o',
    children:[
      { path: 'project', loadChildren: () => import('./project/create/create.module').then(m => m.CreateModule) },
      { path: 'projects', loadChildren: () => import('./project/manage/manage.module').then(m => m.ManageModule) },
      {path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
