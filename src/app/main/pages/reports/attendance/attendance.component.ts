import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StateService } from 'src/app/services/state.service';
import { DistrictService } from 'src/app/services/district.service';
import { DesignationService } from 'src/app/services/designation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {IDistrict, IState, IDesignation, IEmployee} from '../../../../shared/ts';
import { AttendanceService } from 'src/app/services/attendance.service';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  showResult: Boolean = false;
  GetAttendanceForm: FormGroup
  submitted = false;
  StateList: IState[] = [];
  DistrictList: IDistrict[] = [];
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
    this.getDistrictList();
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

  getDistrictList() {
    this.districtService.find().subscribe(
      (res: IDistrict[]) => {
        this.DistrictList = res['data'];
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
        stateId: parseInt(stateId),
        designationId: parseInt(designationId),
        districtId:  parseInt(districtId),
        year: parseInt(year),
        empId: parseInt(empId),
        month: parseInt(month)
      }).subscribe((res) => {
        this.AttendanceList = res['data'];
      }, (err) => {
        console.log(err);
      });
    }
  }

}
