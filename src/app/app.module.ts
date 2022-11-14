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
import { CustomSerializer, rootReducers } from './core/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthEffect } from './features/authentication/core/store';
import { API_ENDPOINT, REST_ENDPOINT } from './core/service';


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
    StoreModule.forRoot(rootReducers, {}),
    EffectsModule.forRoot([AuthEffect]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    { provide: API_ENDPOINT, useValue: REST_ENDPOINT }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
