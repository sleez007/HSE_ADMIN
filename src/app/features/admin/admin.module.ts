import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './core/component/layout/layout.component';
import { SidebarComponent } from './core/component/sidebar/sidebar.component';
import { NavBarComponent } from './core/component/nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
