import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { IDocType } from '../shared/ts';
import { Observable, catchError, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DocTypeService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };
  constructor(private http: HttpClient) { }
  add(Details:IDocType): Observable<IDocType> {
    return this.http.post<IDocType>(environment.apiUrl + "DocumentType", Details, this.httpOptions)
                    .pipe(catchError(this.handleError<IDocType>(`addDocumentTypeDetails`)));
}

put(Details:IDocType, id: number): Observable<IDocType> {
  return this.http.put<IDocType>(environment.apiUrl + `DocumentType/${id}`, Details, this.httpOptions)
                  .pipe(catchError(this.handleError<IDocType>(`putDocumentTypeDetails`)));
}

find(listType: number): Observable<IDocType[]> {
    return this.http.get<IDocType[]>(environment.apiUrl + `DocumentType/${listType}`, this.httpOptions)
                    .pipe(catchError(this.handleError<IDocType[]>('getAllDocumentTypeDetails', [])));
}

handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}
}
