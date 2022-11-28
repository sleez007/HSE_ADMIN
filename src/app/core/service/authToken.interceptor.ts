import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, Observable } from "rxjs";
import { authEndpoints } from "src/app/features/authentication/core/constants";
import { authFeature } from "src/app/features/authentication/core/store";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private readonly store: Store) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.includes(authEndpoints.login)) return next.handle(req);
        return this.store.select(authFeature.selectUser).pipe(exhaustMap(user => {
            if(!user){
                throw new Error("Unauthorized access")
            }else{
                let modifiedReq = req.clone({
                    setHeaders: {
                        'Content-Type' : 'application/json',
                        'Accept'       : 'application/json',
                        'Authorization': "`Bearer ${user.tokens.accessToken}`",
                    }
                })
                console.log(modifiedReq.headers.has("Authorization"))
                console.log(modifiedReq.headers.keys())
                return next.handle(modifiedReq);
            }
        }))
    }
}
