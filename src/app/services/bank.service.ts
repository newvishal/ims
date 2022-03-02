import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {IBank} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({bankName: '', bankId: "", shortCode: '', status: false }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  addBank(bank:IBank): Observable<IBank> {
      return this.http.post<IBank>(environment.apiUrl + "api/Bank", bank, this.httpOptions)
                      .pipe(catchError(this.handleError<IBank>(`addBank`)));
  }

  put(bank:IBank, id: string): Observable<IBank> {
    return this.http.put<IBank>(environment.apiUrl + `api/Bank/${id}`, bank, this.httpOptions)
                    .pipe(catchError(this.handleError<IBank>(`addBank`)));
  }

  getAllBank(): Observable<IBank[]> {
      return this.http.get<IBank[]>(environment.apiUrl + "api/Bank", this.httpOptions)
                      .pipe(catchError(this.handleError<IBank[]>('getAllBank', [])));
  }

  saveBankById(detail : IBank) {
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
