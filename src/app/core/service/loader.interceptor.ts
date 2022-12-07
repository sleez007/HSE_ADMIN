import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
  import { finalize, tap } from 'rxjs';
  
  @Injectable()
  export class LoaderInterceptor implements HttpInterceptor {
    constructor(private progress: NgProgress) {
        this.progressRef = progress.ref('myProgress')
    }
    isInProgress: number = 0;
    progressRef: NgProgressRef;
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if(!this.progressRef.isStarted){
            this.progressRef.start();
            // start the progressbar here
        }

        this.isInProgress++;


        
  
      return next.handle(req).pipe(
        finalize(() => {
          this.isInProgress--;
          if(this.isInProgress == 0){
            this.progressRef.complete();
          }
        })
      );
    }
  }