import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { NetworkHelperService } from "src/app/core/network";
import { ToastService } from "src/app/core/service";
import { DateFormatter } from "src/app/core/util";
import { projectEndpoints } from "../../../../core/constants";
import { ProjectModel } from "../../../../core/model";
import { manageProjectActions, manageProjectApiActions } from "../action/manage.action";

@Injectable()
export class ManageProjectEffect {
    constructor(private readonly action$: Actions, private readonly networkHelper: NetworkHelperService, private toaster: ToastService) {}

    getAllProjects$ = createEffect(() => this.action$.pipe(
        ofType(manageProjectActions.getAllProject),
        mergeMap(() => this.networkHelper.get<ProjectModel[]>(projectEndpoints.all,).pipe(
            map(response => manageProjectApiActions.getAllProjectSuccess({projects: this.formatProject(response)})),
            catchError((error: HttpErrorResponse) => of(manageProjectApiActions.getAllProjectFailure({message: error.error['message'], statusCode: error.status })))
        ) )
    ));

    private formatProject(projects: any[]): ProjectModel[]{
        return projects.map(e => ({projectId: e.id, projectTitle: e.title, startDuration: DateFormatter.stringToDate(e.start) , endDuration: e.end != null ? DateFormatter.stringToDate(e.end): null, isCompleted: e.is_completed}))
    }

    projectCreationSuccess$ = createEffect(() => this.action$.pipe(
        ofType(manageProjectApiActions.getAllProjectSuccess),
       // tap(() => this.toaster.showSuccess('Submitted', 'Projects retrieved'))
    ),{dispatch: false})

    projectCreationError$ = createEffect(() => this.action$.pipe(
        ofType(manageProjectApiActions.getAllProjectFailure),
        tap((e) => this.toaster.showError('Error', e.message))
    ), {dispatch: false})

}

