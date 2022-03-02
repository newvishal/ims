import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import {ILeaveType} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
  subject = new BehaviorSubject<any>(
     localStorage.getItem('details') || 
     JSON.stringify({
        leaveTypeId: '',
        leaveTypeName: "",
        genderApplicable: '',
        carryForwardStatus: "",
        shortCode: '',
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
   
  add(LeaveType:ILeaveType): Observable<ILeaveType> {
      return this.http.post<ILeaveType>(environment.apiUrl + "api/LeaveType", LeaveType, this.httpOptions)
                      .pipe(catchError(this.handleError<ILeaveType>(`addLeaveType`)));
  }

  put(LeaveType:ILeaveType, id: string): Observable<ILeaveType> {
    return this.http.put<ILeaveType>(environment.apiUrl + `api/LeaveType/${id}`, LeaveType, this.httpOptions)
                    .pipe(catchError(this.handleError<ILeaveType>(`putLeaveType`)));
  }

  find(): Observable<ILeaveType[]> {
      return this.http.get<ILeaveType[]>(environment.apiUrl + "api/LeaveType", this.httpOptions)
                      .pipe(catchError(this.handleError<ILeaveType[]>('getAllLeaveType', [])));
  }

  saveDetails(detail : ILeaveType) {
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
