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
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({empLeaveApplicableId: '', leaveTypeId: "", empTypeId: '', perMonthLeaveAllowed: "", maxLeaveAllowed: false,
   carryForwardMaxLimit: '',
   status: false
 }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(LeaveLimit:ILeaveLimit): Observable<ILeaveLimit> {
      return this.http.post<ILeaveLimit>(environment.apiUrl + "api/LeaveLimit", LeaveLimit, this.httpOptions)
                      .pipe(catchError(this.handleError<ILeaveLimit>(`addLeaveLimit`)));
  }

  put(LeaveLimit:ILeaveLimit, id: string): Observable<ILeaveLimit> {
    return this.http.put<ILeaveLimit>(environment.apiUrl + `api/LeaveLimit/${id}`, LeaveLimit, this.httpOptions)
                    .pipe(catchError(this.handleError<ILeaveLimit>(`putLeaveLimit`)));
  }

  find(): Observable<ILeaveLimit[]> {
      return this.http.get<ILeaveLimit[]>(environment.apiUrl + "api/LeaveLimit", this.httpOptions)
                      .pipe(catchError(this.handleError<ILeaveLimit[]>('getAllLeaveLimit', [])));
  }

  saveDetails(detail : ILeaveLimit) {
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
