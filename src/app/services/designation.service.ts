import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {IDesignation} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(designation:IDesignation): Observable<IDesignation> {
      return this.http.post<IDesignation>(environment.apiUrl + "Designation", designation, this.httpOptions)
                      .pipe(catchError(this.handleError<IDesignation>(`addBank`)));
  }

  put(designation:IDesignation, id: number): Observable<IDesignation> {
    return this.http.put<IDesignation>(environment.apiUrl + `Designation/${id}`, designation, this.httpOptions)
                    .pipe(catchError(this.handleError<IDesignation>(`addBank`)));
  }

  find(listType: number): Observable<IDesignation[]> {
    return this.http.get<IDesignation[]>(environment.apiUrl + `Designation/${listType}`, this.httpOptions)
                    .pipe(catchError(this.handleError<IDesignation[]>('getAllDesignationDetails', [])));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
