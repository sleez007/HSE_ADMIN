import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_ENDPOINT } from "../service";


@Injectable({
    providedIn: 'root'
  })
export class NetworkHelperService  {
    
    constructor(@Inject(API_ENDPOINT) private readonly baseUrl: string, private readonly httpClient: HttpClient) {
        console.log(baseUrl);
    }

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

    delete<T>(path: string): Observable<T> {
        const url = this.baseUrl + path;
        return this.httpClient.delete<T>(url);
    }

}