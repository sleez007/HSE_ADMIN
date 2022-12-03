import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/component/layout/layout.component';
const routes: Routes = [
  { 
    path: '', component: LayoutComponent ,
    children: [
      { path: 'project', title: 'HSE | ADD NEW PROJECT', loadChildren: () => import('./project/create/create.module').then(m => m.CreateModule) },
      { path: 'projects', title: 'HSE | MANAGE PROJECTS', loadChildren: () => import('./project/manage/manage.module').then(m => m.ManageModule) },
      { path: 'create-staff', title: 'HSE | ADD STAFFS', loadChildren: () => import('./staff/add-staff/add-staff.module').then(m => m.AddStaffModule) },
      { path: 'all-staffs', title: 'HSE | STAFFS', loadChildren: () => import('./staff/all-staffs/all-staffs.module').then(m => m.AllStaffsModule) },
      { path: 'staff-detail', title: 'HSE | STAFF DETAIL', loadChildren: () => import('./staff/staff-detail/staff-detail.module').then(m => m.StaffDetailModule) },
      { path: 'hse-incident', title: 'HSE | HSE INCIDENTS', loadChildren: () => import('./incidents/hse-incident/hse-incident.module').then(m => m.HseIncidentModule) },
      { path: 'cpa-incident', title: 'HSE | CPA INCIDENTS', loadChildren: () => import('./incidents/cpa-incident/cpa-incident.module').then(m => m.CpaIncidentModule) },
      { path: 'detail/:category', loadChildren: () => import('./incidents/detail/detail.module').then(m => m.DetailModule) },
      { path: '', title: 'HSE | ADMIN DASHBOARD', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
// ng generate module features/admin/staff/add-staff --route create-staff --module features/admin