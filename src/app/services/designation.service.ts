import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {IDesignation} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({designationId: '', designationType: "", designationName: '', shortCode: "", status: false }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(designation:IDesignation): Observable<IDesignation> {
      return this.http.post<IDesignation>(environment.apiUrl + "api/Designation", designation, this.httpOptions)
                      .pipe(catchError(this.handleError<IDesignation>(`addBank`)));
  }

  put(designation:IDesignation, id: string): Observable<IDesignation> {
    return this.http.put<IDesignation>(environment.apiUrl + `api/Designation/${id}`, designation, this.httpOptions)
                    .pipe(catchError(this.handleError<IDesignation>(`addBank`)));
  }

  find(): Observable<IDesignation[]> {
      return this.http.get<IDesignation[]>(environment.apiUrl + "api/Designation", this.httpOptions)
                      .pipe(catchError(this.handleError<IDesignation[]>('getAllBank', [])));
  }

  saveDetails(detail : IDesignation) {
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
