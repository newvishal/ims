import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IProductType } from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }),
  };
  constructor(private http: HttpClient) { }

  add(productType: IProductType): Observable<IProductType> {
    return this.http.post<IProductType>(environment.apiUrl + "ProductType", productType, this.httpOptions)
      .pipe(catchError(this.handleError<IProductType>(`addProductType`)));
  }

  put(productType: IProductType, id: string): Observable<IProductType> {
    return this.http.put<IProductType>(environment.apiUrl + `ProductType/${id}`, productType, this.httpOptions)
      .pipe(catchError(this.handleError<IProductType>(`putProductType`)));
  }

  find(listType: number): Observable<IProductType[]> {
    return this.http.get<IProductType[]>(environment.apiUrl + `ProductType/${listType}`, this.httpOptions)
      .pipe(catchError(this.handleError<IProductType[]>('getAllProductType', [])));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
