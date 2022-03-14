import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StateService } from 'src/app/services/state.service';
import { DistrictService } from 'src/app/services/district.service';
import { DesignationService } from 'src/app/services/designation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {IDistrict, IState, IDesignation, IEmployee} from '../../../../shared/ts';
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
  EmployeeList: IEmployee[] = [];
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    public stateService: StateService,
    public districtService: DistrictService,
    public designationService: DesignationService,
    public employeeService: EmployeeService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.GetAttendanceForm = this.formBuilder.group({
      stateId: ['', Validators.required],
      designationId: ['', Validators.required],
      districtId: ['', Validators.required],
      year: ['', Validators.required],
      empId: ['', Validators.required]
    });
    this.getSateList();
    this.getSateList();
    this.getEmployeeList();
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
      (res: IEmployee[]) => {
        this.EmployeeList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onSubmit(){
    this.submitted = true;
    if (this.GetAttendanceForm.invalid) {
      return;
    } else {
      console.log(this.GetAttendanceForm.value());
    }
  }

}
