import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IEmployee } from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  }; 
  constructor(private http: HttpClient) { }
   
  // addEmployee(employee:IEmployee): Observable<IEmployee> {
  //     return this.http.post<IEmployee>(environment.apiUrl + "Employee", employee, this.httpOptions)
  //                     .pipe(catchError(this.handleError<IEmployee>(`addEmployee`)));
  // }

  // put(employee:IEmployee, id: string): Observable<IBank> {
  //   return this.http.put<IBank>(environment.apiUrl + `Employee/${id}`, employee, this.httpOptions)
  //                   .pipe(catchError(this.handleError<IEmployee>(`put`)));
  // }

  getAllEmployee(): Observable<IEmployee[]> {
      return this.http.get<IEmployee[]>(environment.apiUrl + "Employee", this.httpOptions)
                      .pipe(catchError(this.handleError<IEmployee[]>('getAllEmployee', [])));
  }

  // saveBankById(detail : IEmployee) {
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
