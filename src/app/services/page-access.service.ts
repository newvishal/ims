import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, catchError, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PageAccessService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };
  constructor(private http: HttpClient) { }
  add(data:any){
    return this.http.post(environment.apiUrl + "PageAccess", data, this.httpOptions)
                    .pipe(catchError(this.handleError()));
}

put(data:any, id: number){
  return this.http.put(environment.apiUrl + `PageAccess/${id}`, data, this.httpOptions)
                  .pipe(catchError(this.handleError()));
}

find(listType: number){
    return this.http.get(environment.apiUrl + `PageAccess/${listType}`, this.httpOptions)
                    .pipe(catchError(this.handleError()));
}

handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}
}
