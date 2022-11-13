import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingIndicatorComponent } from './core/component/loading-indicator/loading-indicator.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';


@NgModule({
  declarations: [
    AppComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgProgressModule,
    NgProgressRouterModule,
    NgProgressHttpModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
