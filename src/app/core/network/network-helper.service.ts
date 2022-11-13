import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class NetworkHelperService  {
    private base_url = '';
    
    constructor(private readonly httpClient: HttpClient) {}

    get<T>(path: string): Observable<T> {
        const url = this.base_url + path;
        return this.httpClient.get<T>(url);
    }
    
    post<R,B>(path: string, body: B): Observable<R> {
        const url = this.base_url + path;
        return this.httpClient.post<R>(url, body);
    }

    put<R,B>(path: string, body: B): Observable<R> {
        const url = this.base_url + path;
        return this.httpClient.put<R>(url, body);
    }

    delete<T>(path: string): Observable<T> {
        const url = this.base_url + path;
        return this.httpClient.delete<T>(url);
    }

}