import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { AttendanceService } from 'src/app/services/attendance.service';
declare var $:any;
@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss']
})
export class AddAttendanceComponent implements OnInit {
  time:boolean = false;
  reason:boolean = false;
  searchEmpForm: FormGroup;
  markAttendanceForm: FormGroup;
  submitted = false;
  marAttendanceObj = {};
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager, private employeeService:EmployeeService, private attendanceService:AttendanceService) { }
  curDate=new Date();
  
  ngOnInit(): void {
    this.searchEmpForm = this.formBuilder.group({
      empId: ['', Validators.required]
    });
    
    this.markAttendanceForm = this.formBuilder.group({
      empId: ['', Validators.required],
      empName: [''],
      stateName:[''],
      districtName:[''],
      locationName:[''],
      designationName:[''],
      presentStatus:[''],
      latitude:[''],
      longitude:[''],
      date:[''],
      status:[''],
      inTime:['00:00'],
      remark:['']
    });
    $(document).ready(function(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        alert("Geolocation is not supported by this browser.");
      }
      function showPosition(position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        $('#lat').val(position.coords.latitude);
        $('#long').val(position.coords.longitude);
      }
    });
  }

  get myForm() { return this.searchEmpForm.controls; }
  showPopup(e){
    console.log(e);
    if(e.target.value === "1"){
       this.time = true;
       this.reason = false;
    }
    if(e.target.value === "0"){
     this.reason = true;
     this.time = false;
    }
  }

  searchEmployee(){
    this.submitted = true;
    if (this.searchEmpForm.invalid) {
      return;
    } else {
      //  console.log(this.searchEmpForm.value);
       let empCode = this.searchEmpForm.value["empCode"];
       this.employeeService.searchEmployee(0, empCode).subscribe({
        next: res =>{
          // console.log(res[0]);
          this.marAttendanceObj = {
            empId: res[0]['empId'],
            stateID: res[0]['stateId'],
            districtID: res[0]['districtId'],
            designationId: res[0]['designationId'],
            locationID: res[0]['locationId'],
            designationName: res[0]['designationName']
          }
          this.markAttendanceForm.patchValue(res[0]);
          this.toastr.successToastr(res['message']);
        },
        error: err =>{
          console.log(err);
          this.toastr.warningToastr(err);
        }
      })
    }
  }
  markAttendance(){
     console.log(this.markAttendanceForm.value);
    //  console.log(this.marAttendanceObj);
     let finalObj = {
       ...this.marAttendanceObj,
       date: this.markAttendanceForm.value['date'],
       inTime: this.markAttendanceForm.value['inTime'],
       status:this.markAttendanceForm.value['status'],
       remark:this.markAttendanceForm.value['remark'],
       inLatitudeLongitude: this.markAttendanceForm.value['latitude'] + "@" + this.markAttendanceForm.value['longitude']
     }
     console.log(finalObj);
     this.attendanceService.addEmployee(finalObj).subscribe({
      next: res =>{
        // console.log(res[0]);
        this.toastr.successToastr(res['message']);
        this.markAttendanceForm.reset();
        this.searchEmpForm.reset({
          empId:""
        });
        this.submitted = false;
        this.reason = false;
        this.time = false;
      },
      error: err =>{
        console.log(err);
        this.toastr.warningToastr(err);
      }
    })
  }
}
