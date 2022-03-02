import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {ILocationType} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class LocationTypeService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({locationTypeId: '', locationType: "", shortCode: '', status: false }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(LocationType:ILocationType): Observable<ILocationType> {
      return this.http.post<ILocationType>(environment.apiUrl + "api/LocationType", LocationType, this.httpOptions)
                      .pipe(catchError(this.handleError<ILocationType>(`addLocationType`)));
  }

  put(LocationType:ILocationType, id: string): Observable<ILocationType> {
    return this.http.put<ILocationType>(environment.apiUrl + `api/LocationType/${id}`, LocationType, this.httpOptions)
                    .pipe(catchError(this.handleError<ILocationType>(`UpdateLocationType`)));
  }

  find(): Observable<ILocationType[]> {
      return this.http.get<ILocationType[]>(environment.apiUrl + "api/LocationType", this.httpOptions)
                      .pipe(catchError(this.handleError<ILocationType[]>('getAllLocationType', [])));
  }

  saveDetails(detail : ILocationType) {
    localStorage.setItem('details', JSON.stringify(detail));
    this.subject.next(detail);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
