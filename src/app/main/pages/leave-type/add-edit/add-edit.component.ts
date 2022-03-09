import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { LeaveTypeService } from 'src/app/services/leave-type.service';

import {ILeaveType} from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  LeaveTypeForm: FormGroup;
  submitted = false;
  bsubject: ILeaveType;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private leaveTypeService: LeaveTypeService,private _router: Router) { }
  
  ngOnInit(): void {
    this.LeaveTypeForm = this.formBuilder.group({
      leaveTypeName: ['', Validators.required],
      genderApplicable: [''],
      carryForwardStats: [''],
      shortCode: [''],
    });

    this.patchLocalStorageData();
  }

  patchLocalStorageData() {
    this.leaveTypeService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      console.log(this.bsubject.carryForwardStats);
      this.LeaveTypeForm.patchValue(this.bsubject);
      if(this.bsubject.carryForwardStats == true){
        this.LeaveTypeForm.get("carryForwardStats").patchValue(0);
      }else{
        this.LeaveTypeForm.get("carryForwardStats").patchValue(1);
      }
      
    });
  }
  
  get myForm() { return this.LeaveTypeForm.controls; }

  addLeaveType() {
    this.submitted = true;
    if (this.LeaveTypeForm.invalid) {
      return;
    } else {
      if(this.bsubject.leaveTypeId) {
        let updateObj = {
          ...this.LeaveTypeForm.value,
          genderApplicable: parseInt(this.LeaveTypeForm.value['genderApplicable']),
          carryForwardStats: parseInt(this.LeaveTypeForm.value['carryForwardStats'])
        };
        this.leaveTypeService.put({...updateObj, leaveTypeId: this.bsubject.leaveTypeId} as ILeaveType, this.bsubject.leaveTypeId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/leave-type/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.leaveTypeService.saveDetails({
              leaveTypeId: '',
              leaveTypeName: "",
              genderApplicable: 0,
              carryForwardStats: 0,
              shortCode: ''
            });
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.leaveTypeService.add({...this.LeaveTypeForm.value, carryForwardStats: parseInt(this.LeaveTypeForm.value["carryForwardStats"]),genderApplicable: parseInt(this.LeaveTypeForm.value["genderApplicable"])}).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/leave-type/"]);
          this.toastr.successToastr(res['message']);
        },
        error: err =>{
          console.log(err);
          this.toastr.warningToastr(err);
        }
      })
    }

  }

}
