import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {StepsModule} from 'primeng/steps';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MenuModule} from 'primeng/menu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CalendarModule,
    TableModule
  ],
  exports: [InputTextModule, PasswordModule, ButtonModule, CalendarModule, TableModule, StepsModule, DropdownModule, ProgressSpinnerModule, MenuModule]
})
export class PrimeUiModule { }
