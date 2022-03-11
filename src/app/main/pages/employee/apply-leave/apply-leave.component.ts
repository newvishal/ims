import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { ApplyLeaveService } from 'src/app/services/apply-leave.service';
import { LeaveTypeService } from 'src/app/services/leave-type.service';
import { IApplyLeave, ILeaveType } from 'src/app/shared/ts/index';
@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {
  empId = 0;
  applyLeaveForm: FormGroup;
  submitted = false;
  LeavTypeList: ILeaveType[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private applyLeaveService: ApplyLeaveService,
    private leaveTypeService: LeaveTypeService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['empId']);
    this.empId = parseInt(this.activatedRoute.snapshot.params['empId']);
    this.applyLeaveForm = this.formBuilder.group({
      leaveTypeId: ['', Validators.required],
      empLeaveApplicableId: ['', Validators.required],
      dateFrom: ['',Validators.required],
      dateTo:['',Validators.required],
      leaveDayStatus:['']
    });
    this.getLeaveTypeList();
  }
  getLeaveTypeList() {
    this.leaveTypeService.find().subscribe(
      (res: ILeaveType[]) => {
        this.LeavTypeList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }
  get myForm() { return this.applyLeaveForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.applyLeaveForm.invalid) {
      return;
    } else {
      this.applyLeaveService.applyLeave({...this.applyLeaveForm.value,leaveTypeId: parseInt(this.applyLeaveForm.value['leaveTypeId']) , empid: this.empId, empLeaveApplicableId: parseInt(this.applyLeaveForm.value["empLeaveApplicableId"]), leaveDayStatus: Boolean(this.applyLeaveForm.value['leaveDayStatus'])} as IApplyLeave).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/employee/apply-leave-list"]);
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
