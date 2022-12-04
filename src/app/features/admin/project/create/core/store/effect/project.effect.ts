import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { ToastService } from "src/app/core/service";
import { projectEndpoints } from "../../../../core/constants";
import { ProjectModel } from "../../../../core/model";
import { createProjectActions, createProjectApiActions} from "../action/create-project.action";

@Injectable()
export class ProjectEffect {
    constructor(private readonly action$: Actions, private readonly networkHelper: NetworkHelperService, private toaster: ToastService) {}

    submitProject$ = createEffect(() => this.action$.pipe(
        ofType(createProjectActions.addProject),
        mergeMap((project) => this.networkHelper.post<any, ProjectModel>(projectEndpoints.all, project).pipe(
            map(response => createProjectApiActions.createProjectSuccess(response)),
            catchError((error: HttpErrorResponse) => of(createProjectApiActions.createProjectFailure({message: error.error['message'], statusCode: error.status })))
        ) )
    ));

    projectCreationSuccess$ = createEffect(() => this.action$.pipe(
        ofType(createProjectApiActions.createProjectSuccess),
        tap(() => this.toaster.showSuccess('Submitted', 'Project has been added'))
       // tap(() => this.router.navigate(['/dashboard']))
    ),{dispatch: false})

    projectCreationError$ = createEffect(() => this.action$.pipe(
        ofType(createProjectApiActions.createProjectFailure),
        tap((e) => this.toaster.showError('Error', e.message))
    ), {dispatch: false})

}

