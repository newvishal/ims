import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { IMenu } from '../shared/ts';
import { Observable, catchError, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };
  constructor(private http: HttpClient) { }
  add(menuDetails:IMenu): Observable<IMenu> {
    return this.http.post<IMenu>(environment.apiUrl + "Menu", menuDetails, this.httpOptions)
                    .pipe(catchError(this.handleError<IMenu>(`addMenuDetails`)));
}

put(menuDetails:IMenu, id: number): Observable<IMenu> {
  return this.http.put<IMenu>(environment.apiUrl + `Menu/${id}`, menuDetails, this.httpOptions)
                  .pipe(catchError(this.handleError<IMenu>(`putMenuDetails`)));
}

find(listType: number): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(environment.apiUrl + `Menu/${listType}`, this.httpOptions)
                    .pipe(catchError(this.handleError<IMenu[]>('getAllMenuDetails', [])));
}

handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}
}
