import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ISubProductType } from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class SubProductTypeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }),
  };

  constructor(private http: HttpClient) { }
  add(subProductType: ISubProductType): Observable<ISubProductType> {
    return this.http.post<ISubProductType>(environment.apiUrl + "SubProductType", subProductType, this.httpOptions)
      .pipe(catchError(this.handleError<ISubProductType>(`addSubProductType`)));
  }

  put(subProductType: ISubProductType, id: number): Observable<ISubProductType> {
    return this.http.put<ISubProductType>(environment.apiUrl + `SubProductType/${id}`, subProductType, this.httpOptions)
      .pipe(catchError(this.handleError<ISubProductType>(`putSubProductType`)));
  }

  find(listType: number): Observable<ISubProductType[]> {
    return this.http.get<ISubProductType[]>(environment.apiUrl + `SubProductType/${listType}`, this.httpOptions)
      .pipe(catchError(this.handleError<ISubProductType[]>('getAllSubProductType', [])));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
