import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IEmployee } from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify(
    {
      AadharNo: '',
      AccountNo: '',
      Address1: "",
      Address2: "",
      BankName: 0,
      CL: '',
      Channel: '',
      DOB: "",
      DOJ: "",
      DesignationId: 0,
      DistrictId: 0,
      DistrictName: "",
      EL: 0,
      ESINo: "",
      EmailId: "",
      EmpDesigStatus: '',
      EmpFatherName: "",
      EmpId: 0,
      EmpName: "",
      Entity: null,
      ExpDate: null,
      Gender: "",
      IFSCCode: null,
      Image: null,
      JoiningDistId: 0,
      JoiningStateId: 0,
      LocationId: 0,
      LocationName: "",
      MobNo: '',
      OfficialEmailId: null,
      PANNo: null,
      PFNo: "",
      PL: 0,
      PinCode: "",
      RegistrationDate: null,
      SL: 0,
      ServiceStatus: "",
      StateId: 0,
      StateName: "",
      Status: false,
      WhatsAppNo: '' 
  }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  }; 
  constructor(private http: HttpClient) { }
   
  addEmployee(formData: any): Observable<any> {
      return this.http.post<IEmployee>(environment.apiUrl + "Employee/AddEmployee", formData, 
                      {
                        headers: new HttpHeaders({
                          "Authorization": `Bearer ${localStorage.getItem("token")}`,
                         }),
                         responseType: 'text' as 'json'
                      })
                      .pipe(catchError(this.handleError<any>(`addEmployee`)));
  }

  updateEmployee(formData: any): Observable<any> {
    return this.http.post<IEmployee>(environment.apiUrl + "Employee/UpdateEmployee", formData, 
                  {
                    headers: new HttpHeaders({ 
                      "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }),
                    responseType: 'text' as 'json'
                  })
                    .pipe(catchError(this.handleError<any>(`updateEmployee`)));
  }

  getById(id: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(environment.apiUrl + `Employee/searchemployee/${id}`, this.httpOptions)
                    .pipe(catchError(this.handleError<IEmployee>(`getByiD`)));
  }

  getAllEmployee(): Observable<IEmployee[]> {
      return this.http.get<IEmployee[]>(environment.apiUrl + "Employee", this.httpOptions)
                      .pipe(catchError(this.handleError<IEmployee[]>('getAllEmployee', [])));
  }

  getEmployees(): Observable<any[]> {
      return this.http.get<any[]>(environment.apiUrl + "Employee", this.httpOptions)
                      .pipe(catchError(this.handleError<any[]>('getAllEmployee', [])));
  }

  searchEmployee(id: number){
    return this.http.get(environment.apiUrl + `Employee/searchEmployee/${id}`, this.httpOptions)
                    .pipe(catchError(this.handleError()));
  }

  saveEmployeeById(detail: any) {
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
