import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, catchError, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApplicationPagesService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };
  constructor(private http: HttpClient) { }
  add(menuDetails:any){
    return this.http.post(environment.apiUrl + "ApplicationPages", menuDetails, this.httpOptions)
                    .pipe(catchError(this.handleError()));
}

put(menuDetails:any, id: number){
  return this.http.put(environment.apiUrl + `ApplicationPages/${id}`, menuDetails, this.httpOptions)
                  .pipe(catchError(this.handleError()));
}

find(listType: number){
    return this.http.get(environment.apiUrl + `ApplicationPages/${listType}`, this.httpOptions)
                    .pipe(catchError(this.handleError()));
}

handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}
}
