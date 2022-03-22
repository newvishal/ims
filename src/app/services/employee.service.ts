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
   
  addEmployee(formData: any): Observable<any> {
      return this.http.post<IEmployee>(environment.apiUrl + "Employee/AddEmployee", formData, {headers: new HttpHeaders({
                          "Authorization": `Bearer ${localStorage.getItem("token")}`
                      })})
                      .pipe(catchError(this.handleError<any>(`addEmployee`)));
  }

  getById(id: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(environment.apiUrl + `Employee/searchemployee/${id}`, this.httpOptions)
                    .pipe(catchError(this.handleError<IEmployee>(`getByiD`)));
  }

  getAllEmployee(): Observable<IEmployee[]> {
      return this.http.get<IEmployee[]>(environment.apiUrl + "Employee", this.httpOptions)
                      .pipe(catchError(this.handleError<IEmployee[]>('getAllEmployee', [])));
  }

  getEmployees(): Observable<any[]> {
      return this.http.get<any[]>(environment.apiUrl + "Employee", this.httpOptions)
                      .pipe(catchError(this.handleError<any[]>('getAllEmployee', [])));
  }

  searchEmployee(id: number){
    return this.http.get(environment.apiUrl + `Employee/searchEmployee/${id}`, this.httpOptions)
                    .pipe(catchError(this.handleError()));
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
