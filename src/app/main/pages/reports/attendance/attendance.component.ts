import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StateService } from 'src/app/services/state.service';
import { DistrictService } from 'src/app/services/district.service';
import { DesignationService } from 'src/app/services/designation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {IDistrict, IState, IDesignation, IEmployee} from '../../../../shared/ts';
import { AttendanceService } from 'src/app/services/attendance.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  initColumns = [
    { columnDef: 'EmpName', header: 'Name' },
    { columnDef: '1', header: 'Day 1' },
    { columnDef: '2', header: 'Day 2' },
    { columnDef: '3', header: 'Day 3' },
    { columnDef: '4', header: 'Day 4' },
    { columnDef: '5', header: 'Day 5' },
    { columnDef: '6', header: 'Day 6' },
    { columnDef: '7', header: 'Day 7' },
    { columnDef: '8', header: 'Day 8' },
    { columnDef: '9', header: 'Day 9' },
    { columnDef: '10', header: 'Day 10' },
    { columnDef: '11', header: 'Day 11' },
    { columnDef: '12', header: 'Day 12' },
    { columnDef: '13', header: 'Day 13' },
    { columnDef: '14', header: 'Day 14' },
    { columnDef: '15', header: 'Day 15' },
    { columnDef: '16', header: 'Day 16' },
    { columnDef: '17', header: 'Day 17' },
    { columnDef: '18', header: 'Day 18' },
    { columnDef: '19', header: 'Day 19' },
    { columnDef: '20', header: 'Day 20' },
    { columnDef: '21', header: 'Day 21' },
    { columnDef: '22', header: 'Day 22' },
    { columnDef: '23', header: 'Day 23' },
    { columnDef: '24', header: 'Day 24' },
    { columnDef: '25', header: 'Day 25' },
    { columnDef: '26', header: 'Day 26' },
    { columnDef: '27', header: 'Day 27' },
    { columnDef: '28', header: 'Day 28' },
    { columnDef: '29', header: 'Day 29' },
    { columnDef: '30', header: 'Day 30' },
    { columnDef: '31', header: 'Day 31' },
    { columnDef: 'TotalWorkingHours', header: 'Total Working Hours' },
    { columnDef: 'InTime', header: 'In Time' },
    { columnDef: 'OutTime', header: 'OutTime' },
    { columnDef: 'DesignationName', header: 'Designation' },
    { columnDef: 'StateId', header: 'State' },
    { columnDef: 'DistrictId', header: 'District' },
  ];
  displayedColumns: any[] = this.initColumns.map(col => col.columnDef);
  dataSource: MatTableDataSource<IEmployee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  GetAttendanceForm: FormGroup
  submitted = false;
  StateList: IState[] = [];
  DesignationList: IDesignation[] = [];
  EmployeeList = [];
  AttendanceList: any = [];
  districtListByState: Array<any> = [];
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    public stateService: StateService,
    public districtService: DistrictService,
    public designationService: DesignationService,
    public employeeService: EmployeeService,
    private _router: Router,
    public AttendanceServ :AttendanceService
  ) { }

  ngOnInit(): void {
    this.GetAttendanceForm = this.formBuilder.group({
      stateId: ['', Validators.required],
      designationId: ['', Validators.required],
      districtId: ['', Validators.required],
      year: ['', Validators.required],
      empId: ['', Validators.required],
      month: ['', Validators.required]
    });
    this.getSateList();
    this.getEmployeeList();
    this.getDesignationList();
  }
  get myForm() { return this.GetAttendanceForm.controls; }
  getSateList() {
    this.stateService.find().subscribe(
      (res: IState[]) => {
        this.StateList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getDistrictByStateList(stateId: string) {
    console.log(stateId);
    this.districtService.findDistrictByState(parseInt(stateId)).subscribe(
      (res) => {
        
        this.districtListByState = res['data'];
        console.log(this.districtListByState);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getDesignationList() {
    this.designationService.find(0).subscribe(
      (res: IDesignation[]) => {
        this.DesignationList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }


  getEmployeeList() {
    this.employeeService.getAllEmployee().subscribe(
      (res) => {
        console.log(res);
        this.EmployeeList = Object.assign([],res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onSearch(){
    this.submitted = true;
    if (this.GetAttendanceForm.invalid) {
      return;
    } else {
      const {
        stateId,
        designationId,
        districtId,
        year,
        empId,
        month
      } = this.GetAttendanceForm.value;
      this.AttendanceServ.getAttendance({
        stateId: parseInt(stateId) ,
        designationId: parseInt(designationId) ,
        districtId:  parseInt(districtId) ,
        year: parseInt(year),
        empId: parseInt(empId) ,
        month: parseInt(month) 
      }).subscribe((res) => {
        this.AttendanceList = res['data'];
        this.dataSource = new MatTableDataSource(this.AttendanceList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (err) => {
        console.log(err);
      });
    }
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeColumn(key: string) {
    this.displayedColumns = this.initColumns.map(col => col.columnDef);
    if (this.displayedColumns.length) {
      console.log(this.displayedColumns)
      if(key === 'TotalWorkingHours') {
        this.displayedColumns = this.displayedColumns.filter(e => e == 'EmpName' || e == 'TotalWorkingHours')
      }
      if(key === 'InTime') {
        this.displayedColumns = this.displayedColumns.filter(e => e == 'EmpName' || e == 'InTime' || e == 'OutTime')
      }

      if(key === 'Present') {
        this.displayedColumns = this.displayedColumns.filter(e => e != 'TotalWorkingHours' && e != 'InTime' && e != 'OutTime' && e != 'DesignationName'  && e != 'StateId' && e != 'DistrictId')
      }
    }
  }

}
