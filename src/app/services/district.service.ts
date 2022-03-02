import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import {IDistrict} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({districtId: '', zoneId: '', districtName: '', shortCode: "", status: false }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(district:IDistrict): Observable<IDistrict> {
      return this.http.post<IDistrict>(environment.apiUrl + "api/District", district, this.httpOptions)
                      .pipe(catchError(this.handleError<IDistrict>(`addDistrict`)));
  }

  put(district:IDistrict, id: string): Observable<IDistrict> {
    return this.http.put<IDistrict>(environment.apiUrl + `api/District/${id}`, district, this.httpOptions)
                    .pipe(catchError(this.handleError<IDistrict>(`putDistrict`)));
  }

  find(): Observable<IDistrict[]> {
      return this.http.get<IDistrict[]>(environment.apiUrl + "api/District", this.httpOptions)
                      .pipe(catchError(this.handleError<IDistrict[]>('getAllDistrict', [])));
  }

  saveDetails(detail : IDistrict) {
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
