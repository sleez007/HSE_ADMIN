import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { projectEndpoints } from "../../../../core/constants";
import { ProjectModel } from "../../../../core/model";
import { createProjectActions, createProjectApiActions} from "../action/create-project.action";

@Injectable()
export class ProjectEffect {
    constructor(private readonly action$: Actions, private readonly networkHelper: NetworkHelperService, private router: Router) {}
    
    submitProject$ = createEffect(() => this.action$.pipe(
        ofType(createProjectActions.addProject),
        exhaustMap((project) => this.networkHelper.post<any, ProjectModel>(projectEndpoints.all, project).pipe(
            map(response => createProjectApiActions.createProjectSuccess(response)),
            catchError((error) => of(createProjectApiActions.createProjectFailure({message: error['message'], statusCode: 401 })))
        ) )
    ));

    projectCreationSuccess$ = createEffect(() => this.action$.pipe(
        ofType(createProjectApiActions.createProjectSuccess),
        tap(() => this.router.navigate(['/dashboard']))
    ),{dispatch: false})

    projectCreationError$ = createEffect(() => this.action$.pipe(
        ofType(createProjectApiActions.createProjectFailure),
        tap((e) => console.log(e))
    ), {dispatch: false})

}