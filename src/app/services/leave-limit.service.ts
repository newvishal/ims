import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import {ILeaveLimit} from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class LeaveLimitService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(LeaveLimit:ILeaveLimit): Observable<ILeaveLimit> {
      return this.http.post<ILeaveLimit>(environment.apiUrl + "EmployeeLeaveLimit", LeaveLimit, this.httpOptions)
                      .pipe(catchError(this.handleError<ILeaveLimit>(`addLeaveLimit`)));
  }

  put(LeaveLimit:ILeaveLimit, id: number): Observable<ILeaveLimit> {
    return this.http.put<ILeaveLimit>(environment.apiUrl + `EmployeeLeaveLimit/${id}`, LeaveLimit, this.httpOptions)
                    .pipe(catchError(this.handleError<ILeaveLimit>(`putLeaveLimit`)));
  }

  find(listType: number): Observable<ILeaveLimit[]> {
    return this.http.get<ILeaveLimit[]>(environment.apiUrl + `EmployeeLeaveLimit/${listType}`, this.httpOptions)
                    .pipe(catchError(this.handleError<ILeaveLimit[]>('getAllLeaveLimitDetails', [])));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
