import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  }; 

  imageUpload(formdata: any) {
    return this.http.post<any>(environment.apiUrl + "FileUpload/UploadAttachments", formdata,
     {
       headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }),
      responseType: 'text' as 'json'
    },
    )
    .pipe(catchError(this.handleError<any>(`imageUpload`)));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
  
}
