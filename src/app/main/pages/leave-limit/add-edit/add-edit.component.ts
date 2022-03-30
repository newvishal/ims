import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { LeaveLimitService } from 'src/app/services/leave-limit.service';
import { LeaveTypeService } from 'src/app/services/leave-type.service';
import { ILeaveLimit, ILeaveType } from 'src/app/shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  LeaveLimitForm: FormGroup;
  submitted: boolean = false;
  empLeaveApplicableId: number;
  leaveTypeList: ILeaveType[] = []
  constructor(
    public fb: FormBuilder,
    public _router: Router,
    public activeRoute: ActivatedRoute,
    public toast: ToastrManager,
    public leavelimitSrv: LeaveLimitService,
    public leaveTypeSrv: LeaveTypeService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getLeaveType();
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.empLeaveApplicableId = params['id'];
    })
    if(this.empLeaveApplicableId) this.getVendorDetails(this.empLeaveApplicableId)
  }
  getLeaveType(){
    this.leaveTypeSrv.find().subscribe((res: ILeaveType[]) => {
      console.log(res);
      this.leaveTypeList = res["data"] as ILeaveType[];
    }, (err) => {
      console.log(err)
    });
  } 

  getVendorDetails(empLeaveApplicableId: number) {
    this.leavelimitSrv.find(empLeaveApplicableId).subscribe((res) => {
      const Details = res['data'][0];
      this.LeaveLimitForm.patchValue(Details);
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  createForm() {
    this.LeaveLimitForm = this.fb.group({
      leaveTypeId: ['', Validators.required],
      empTypeId: ['', Validators.required],
      perMonthLeaveAllowed: ['', Validators.required],
      maxLeaveAllowed: ['', Validators.required],
      carryForwardMaxLimit: ['', Validators.required]
    })
  }
  get myForm() { return this.LeaveLimitForm.controls; }
  
  addLeaveLimit() {
    this.submitted = true;
    if (this.LeaveLimitForm.invalid) {
      return;
    } else {
      if(this.empLeaveApplicableId) {
        this.leavelimitSrv.put(
          { 
            empLeaveApplicableId: parseInt(`${this.empLeaveApplicableId}`),
            leaveTypeId: parseInt(`${this.LeaveLimitForm.value['leaveTypeId']}`),
            empTypeId: parseInt(`${this.LeaveLimitForm.value['empTypeId']}`),
            perMonthLeaveAllowed: parseInt(`${this.LeaveLimitForm.value['perMonthLeaveAllowed']}`),
            maxLeaveAllowed: parseInt(`${this.LeaveLimitForm.value['maxLeaveAllowed']}`),
            carryForwardMaxLimit: parseInt(`${this.LeaveLimitForm.value['carryForwardMaxLimit']}`) } as ILeaveLimit, this.empLeaveApplicableId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/leave-limit/"]);
            this.toast.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toast.warningToastr(err);
          }
        })
        return;
      }
      this.leavelimitSrv.add({ 
        leaveTypeId: parseInt(`${this.LeaveLimitForm.value['leaveTypeId']}`),
        empTypeId: parseInt(`${this.LeaveLimitForm.value['empTypeId']}`),
        perMonthLeaveAllowed: parseInt(`${this.LeaveLimitForm.value['perMonthLeaveAllowed']}`),
        maxLeaveAllowed: parseInt(`${this.LeaveLimitForm.value['maxLeaveAllowed']}`),
        carryForwardMaxLimit: parseInt(`${this.LeaveLimitForm.value['carryForwardMaxLimit']}`) } as ILeaveLimit).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/leave-limit/"]);
          this.toast.successToastr(res['message']);
        },
        error: err =>{
          console.log(err);
          this.toast.warningToastr(err);
        }
      })
    }

  }
}
