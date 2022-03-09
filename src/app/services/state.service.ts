import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {IState} from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class StateService {

  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({stateId: '', stateName: '', shortCode: "", status: false }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(state:IState): Observable<IState> {
      return this.http.post<IState>(environment.apiUrl + "State", state, this.httpOptions)
                      .pipe(catchError(this.handleError<IState>(`addDistrict`)));
  }

  put(state:IState, id: string): Observable<IState> {
    return this.http.put<IState>(environment.apiUrl + `State/${id}`, state, this.httpOptions)
                    .pipe(catchError(this.handleError<IState>(`putState`)));
  }

  find(): Observable<IState[]> {
      return this.http.get<IState[]>(environment.apiUrl + "State", this.httpOptions)
                      .pipe(catchError(this.handleError<IState[]>('getAllState', [])));
  }

  saveDetails(detail : IState) {
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
