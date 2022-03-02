import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import {ILocation} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  subject = new BehaviorSubject<any>(
     localStorage.getItem('details') || 
     JSON.stringify({
       locationId: '',
       zoneId: "",
       districtId: '',
       locationTypeId: "",
       locationName: "",
       shortCode: "",
       hra: "",
       ccaStatus: "",
       cccAmount: "",
       status: false
    }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(Location:ILocation): Observable<ILocation> {
      return this.http.post<ILocation>(environment.apiUrl + "api/Location", Location, this.httpOptions)
                      .pipe(catchError(this.handleError<ILocation>(`addLocation`)));
  }

  put(Location:ILocation, id: string): Observable<ILocation> {
    return this.http.put<ILocation>(environment.apiUrl + `api/Location/${id}`, Location, this.httpOptions)
                    .pipe(catchError(this.handleError<ILocation>(`putLocation`)));
  }

  find(): Observable<ILocation[]> {
      return this.http.get<ILocation[]>(environment.apiUrl + "api/Location", this.httpOptions)
                      .pipe(catchError(this.handleError<ILocation[]>('getAllLocation', [])));
  }

  saveDetails(detail : ILocation) {
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
