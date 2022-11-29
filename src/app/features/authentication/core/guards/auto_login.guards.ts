import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { TokenValidatorService } from "src/app/core/service";
import { authFeature } from "src/app/features/authentication/core/store";

@Injectable({providedIn: 'root'})
export class AutoLoginGuard  implements CanActivate{
    
    constructor(private readonly store: Store, private readonly router: Router, private readonly tokenValidator: TokenValidatorService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(authFeature.selectUser).pipe(map(user => {
            if(user && this.tokenValidator.isValidRefreshToken(user.tokens.refreshExpiry)){
                return this.router.createUrlTree(['dashboard'])
            }else{
                return true; 
            }
        }));
    }
}
