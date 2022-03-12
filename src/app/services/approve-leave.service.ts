import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IApprovedLeave } from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class ApproveLeaveService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };
  constructor(private http: HttpClient) { }

  approvedLeave(approveLeave:IApprovedLeave): Observable<IApprovedLeave> {
    return this.http.post<IApprovedLeave>(environment.apiUrl + "ApplyLeave/ApproveLeave", approveLeave, this.httpOptions)
                    .pipe(catchError(this.handleError<IApprovedLeave>(`approvedLeave`)));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
