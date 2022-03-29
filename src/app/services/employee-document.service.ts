import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {IEmployeeDocument} from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class EmployeeDocumentService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };
  constructor(private http: HttpClient) { }

  updateEmployeeDocument(formData: any): Observable<any> {
      return this.http.post<IEmployeeDocument>(environment.apiUrl + "EmployeeDocument/UpdateEmployeeDocument", formData, 
                      {
                        headers: new HttpHeaders({
                          "Authorization": `Bearer ${localStorage.getItem("token")}`,
                         }),
                         responseType: 'text' as 'json'
                      })
                      .pipe(catchError(this.handleError<any>(`updateEmployeeDocument`)));
  }

  find(listType: number): Observable<IEmployeeDocument[]> {
    return this.http.get<IEmployeeDocument[]>(environment.apiUrl + `EmployeeDocument/${listType}`, this.httpOptions)
                    .pipe(catchError(this.handleError<IEmployeeDocument[]>('getAllEmployeeDocuments', [])));
  }

  addEmployeeDocument(formData: any): Observable<any> {
      return this.http.post<IEmployeeDocument>(environment.apiUrl + "EmployeeDocument/AddEmployeeDocument", formData, 
                      {
                        headers: new HttpHeaders({
                          "Authorization": `Bearer ${localStorage.getItem("token")}`,
                         }),
                         responseType: 'text' as 'json'
                      })
                      .pipe(catchError(this.handleError<any>(`addEmployeeDocument`)));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
