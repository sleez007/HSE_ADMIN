import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ErrorResponse } from "../model";
import { API_ENDPOINT } from "../service";


@Injectable({
    providedIn: 'root'
  })
export class NetworkHelperService  {
    
    constructor(@Inject(API_ENDPOINT) private readonly baseUrl: string, private readonly httpClient: HttpClient) {}

    get<T>(path: string): Observable<T> {
        const url = this.baseUrl + path;
        return this.httpClient.get<T>(url);
    }
    
    post<R,B>(path: string, body: B): Observable<R> {
        const url = this.baseUrl + path;
        return this.httpClient.post<R>(url, body);
    }

    put<R,B>(path: string, body: B): Observable<R> {
        const url = this.baseUrl + path;
        return this.httpClient.put<R>(url, body);
    }

    patch<R,B>(path: string, body: B): Observable<R> {
        const url = this.baseUrl + path;
        return this.httpClient.patch<R>(url, body);
    }

    delete<T>(path: string): Observable<T> {
        const url = this.baseUrl + path;
        return this.httpClient.delete<T>(url);
    }

    static handleError(error: HttpErrorResponse, ): ErrorResponse{
        switch(error.status){
            case 0: {
                return {message: 'Please ensure you are connected to the Internet', statusCode: error.status}
            }
            default: {
                return {message: error.message, statusCode: error.status}
            }
        }
    }

}