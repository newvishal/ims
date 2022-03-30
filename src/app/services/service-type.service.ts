import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {IServiceType} from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(Details:IServiceType): Observable<IServiceType> {
      return this.http.post<IServiceType>(environment.apiUrl + "ServiceType", Details, this.httpOptions)
                      .pipe(catchError(this.handleError<IServiceType>(`addServiceTypeDetails`)));
  }

  put(Details:IServiceType, id: number): Observable<IServiceType> {
    return this.http.put<IServiceType>(environment.apiUrl + `ServiceType/${id}`, Details, this.httpOptions)
                    .pipe(catchError(this.handleError<IServiceType>(`putServiceTypeDetails`)));
  }

  find(listType: number): Observable<IServiceType[]> {
      return this.http.get<IServiceType[]>(environment.apiUrl + `ServiceType/${listType}`, this.httpOptions)
                      .pipe(catchError(this.handleError<IServiceType[]>('getAllServiceTypeDetails', [])));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
