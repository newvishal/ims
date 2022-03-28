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
      BankName: '',
      CL: '',
      Channel: '',
      DOB: "",
      DOJ: "",
      DesignationId: '',
      DistrictId: '',
      DistrictName: "",
      EL: '',
      ESINo: "",
      EmailId: "",
      EmpDesigStatus: '',
      EmpFatherName: "",
      EmpId: '',
      EmpName: "",
      Entity: null,
      ExpDate: null,
      Gender: "",
      IFSCCode: null,
      Image: null,
      JoiningDistId: '',
      JoiningStateId: '',
      LocationId: '',
      LocationName: "",
      MobNo: '',
      OfficialEmailId: null,
      PANNo: null,
      PFNo: "",
      PL: '',
      PinCode: "",
      RegistrationDate: null,
      SL: '',
      ServiceStatus: "",
      StateId: '',
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

  getAllEmployee(): Observable<any>{
      return this.http.get<any[]>(environment.apiUrl + "Employee/0", this.httpOptions)
                      .pipe(catchError(this.handleError<any[]>('getAllEmployee', [])));
  }

  getEmployees(): Observable<any[]> {
      return this.http.get<any[]>(environment.apiUrl + "Employee", this.httpOptions)
                      .pipe(catchError(this.handleError<any[]>('getAllEmployee', [])));
  }

  searchEmployee(id: number, empCode: string){
    return this.http.get(environment.apiUrl + `Employee/searchEmployee/${id}/${empCode}`, this.httpOptions)
                    .pipe(catchError(this.handleError()));
  }

  saveEmployeeById(detail: any) {
    localStorage.setItem('details', JSON.stringify(detail));
    this.subject.next(detail);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) => {
      console.error(`${operation} failed: ${error}`);
        // console.log(typeof error)
        // const { errors } = JSON.parse(error.toString());
        // let errList = []
        // Object.keys(errors).forEach(e => {
        //     if(errors[e]){
        //       errors[e].forEach(err => errList.push(err))
        //     }
        // })
        // console.log(errList);
        return throwError(error);
    };
  }
}
