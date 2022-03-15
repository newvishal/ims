import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IChannel } from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };
  constructor(private http: HttpClient) { }
   
  add(channelDetails:IChannel): Observable<IChannel> {
      return this.http.post<IChannel>(environment.apiUrl + "Channel", channelDetails, this.httpOptions)
                      .pipe(catchError(this.handleError<IChannel>(`addVendorDetails`)));
  }

  put(channelDetails:IChannel, id: number): Observable<IChannel> {
    return this.http.put<IChannel>(environment.apiUrl + `Channel/${id}`, channelDetails, this.httpOptions)
                    .pipe(catchError(this.handleError<IChannel>(`putVendorDetails`)));
  }

  find(listType: number): Observable<IChannel[]> {
      return this.http.get<IChannel[]>(environment.apiUrl + `Channel/${listType}`, this.httpOptions)
                      .pipe(catchError(this.handleError<IChannel[]>('getAllVendorDetails', [])));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
