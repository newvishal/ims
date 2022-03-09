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
      carryForwardStatus: [''],
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
      this.LeaveTypeForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.LeaveTypeForm.controls; }

  addLeaveType() {
    this.submitted = true;
    if (this.LeaveTypeForm.invalid) {
      return;
    } else {
      if(this.bsubject.leaveTypeId) {
       
        this.leaveTypeService.put({...this.LeaveTypeForm.value, leaveTypeId: this.bsubject.leaveTypeId} as ILeaveType, this.bsubject.leaveTypeId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/leave-type/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.leaveTypeService.saveDetails({
              leaveTypeId: '',
              leaveTypeName: "",
              genderApplicable: 0,
              carryForwardStatus: false,
              shortCode: '',
              status: false
            });
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.leaveTypeService.add({...this.LeaveTypeForm.value}).subscribe({
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
