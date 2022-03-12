import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {IVendorDetails} from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class VendorService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(VendorDetails:IVendorDetails): Observable<IVendorDetails> {
      return this.http.post<IVendorDetails>(environment.apiUrl + "VendorDetails", VendorDetails, this.httpOptions)
                      .pipe(catchError(this.handleError<IVendorDetails>(`addVendorDetails`)));
  }

  put(VendorDetails:IVendorDetails, id: number): Observable<IVendorDetails> {
    return this.http.put<IVendorDetails>(environment.apiUrl + `VendorDetails/${id}`, VendorDetails, this.httpOptions)
                    .pipe(catchError(this.handleError<IVendorDetails>(`putVendorDetails`)));
  }

  find(listType: number): Observable<IVendorDetails[]> {
      return this.http.get<IVendorDetails[]>(environment.apiUrl + `VendorDetails/${listType}`, this.httpOptions)
                      .pipe(catchError(this.handleError<IVendorDetails[]>('getAllVendorDetails', [])));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
