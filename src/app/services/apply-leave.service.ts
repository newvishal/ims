import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IApplyLeave } from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class ApplyLeaveService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }),
  };

  constructor(private http: HttpClient) { }

  applyLeave(applyLeave: IApplyLeave): Observable<IApplyLeave> {
    return this.http.post<IApplyLeave>(environment.apiUrl + "ApplyLeave", applyLeave, this.httpOptions)
      .pipe(catchError(this.handleError<IApplyLeave>(`applyLeave`)));
  }

  // put(bank: IApplyLeave, id: string): Observable<IApplyLeave> {
  //   return this.http.put<IApplyLeave>(environment.apiUrl + `Bank/${id}`, bank, this.httpOptions)
  //     .pipe(catchError(this.handleError<IApplyLeave>(`addBank`)));
  // }

  getAllAppliedLeave(): Observable<IApplyLeave[]> {
    return this.http.get<IApplyLeave[]>(environment.apiUrl + "ApplyLeave", this.httpOptions)
      .pipe(catchError(this.handleError<IApplyLeave[]>('getAllAppliedLeave', [])));
  }

  // saveBankById(detail : IBank) {
  //   localStorage.setItem('details', JSON.stringify(detail));
  //   this.subject.next(detail);
  // }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
