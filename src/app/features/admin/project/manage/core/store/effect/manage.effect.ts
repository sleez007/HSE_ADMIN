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

    deleteProject$ = createEffect(() => this.action$.pipe(
        ofType(manageProjectActions.deleteProject),
        mergeMap((prop) => this.networkHelper.delete<any>(projectEndpoints.all+'/'+prop.id).pipe(
            map(e => manageProjectApiActions.deleteProjectSuccess({id: prop.id})),
            catchError((error: HttpErrorResponse) => of(manageProjectApiActions.deleteProjectFailure({message: error.error['message'], statusCode: error.status })))
        ))
    ));

    editProject$ = createEffect(() => this.action$.pipe(
        ofType(manageProjectActions.editProject),
        mergeMap((prop) => this.networkHelper.put<any, ProjectModel>(projectEndpoints.all+'/'+prop.projectId, prop).pipe(
            map(e => manageProjectApiActions.editProjectSuccess({projectId: e.project.id, projectTitle: e.project.title, startDuration: DateFormatter.stringToDate(e.project.start) , endDuration: e.project.end != null ? DateFormatter.stringToDate(e.project.end): null, isCompleted: e.project.is_completed}) ),
            catchError((error: HttpErrorResponse) => of(manageProjectApiActions.editProjectFailure({message: error.error['message'], statusCode: error.status })))
        ))
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
    
    projectEditSuccess$ = createEffect(() => this.action$.pipe(
        ofType(manageProjectApiActions.editProjectSuccess),
        tap(() => this.toaster.showSuccess('Updated', 'Project updated successfully!'))
    ),{dispatch: false})

    projectEditError$ = createEffect(() => this.action$.pipe(
        ofType(manageProjectApiActions.editProjectFailure),
        tap((e) => this.toaster.showError('Error', e.message))
    ), {dispatch: false})

    projectDeleteSuccess$ = createEffect(() => this.action$.pipe(
        ofType(manageProjectApiActions.deleteProjectSuccess),
        tap(() => this.toaster.showSuccess('Updated', 'Project deleted successfully!'))
    ),{dispatch: false})

    projectDeleteError$ = createEffect(() => this.action$.pipe(
        ofType(manageProjectApiActions.deleteProjectFailure),
        tap((e) => this.toaster.showError('Error', e.message))
    ), {dispatch: false})

}

