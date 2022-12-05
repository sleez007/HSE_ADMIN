import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot,  UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { staffFeature } from "../store";

@Injectable({providedIn: 'root'})
export class SecondPageGuard  implements CanActivate{

    constructor(private readonly store: Store, private readonly router: Router, ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(staffFeature.selectHasFilledInitialCorrectly).pipe(map(value => {
            if(value){
                return true;
            }else{
                return this.router.createUrlTree(['/dashboard/create-staff'])
            }
        }));
    }



}