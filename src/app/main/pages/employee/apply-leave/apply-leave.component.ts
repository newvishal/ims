import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { ApplyLeaveService } from 'src/app/services/apply-leave.service';
import { LeaveTypeService } from 'src/app/services/leave-type.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';
import { IApplyLeave, ILeaveType, IEmployee } from 'src/app/shared/ts/index';
@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {
  empId = 0;
  applyLeaveForm: FormGroup;
  searchEmpForm: FormGroup;
  submitted = false;
  submitted2 = false;
  selectedFiles: any;
  LeavTypeList: ILeaveType[] = [];
  EmployeeList = [];
  isShow: boolean = true;
  empSearchResult : object = {};
  constructor(
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private applyLeaveService: ApplyLeaveService,
    private leaveTypeService: LeaveTypeService,
    private employeeService: EmployeeService,
    private _router: Router,
    public utilityService: UtilityService
    ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['empId']);
    this.empId = parseInt(this.activatedRoute.snapshot.params['empId']);
    this.searchEmpForm = this.formBuilder.group({
      empCode: ['', Validators.required]
    });
    this.applyLeaveForm = this.formBuilder.group({
      empId: ['', Validators.required],
      leaveTypeId: ['', Validators.required],
      // empLeaveApplicableId: ['', Validators.required],
      dateFrom: ['',Validators.required],
      dateTo:['',Validators.required],
      leaveDayStatus:['',Validators.required],
      reason:['',Validators.required],
      attachment:['']
    });
    this.getLeaveTypeList();
    this.getEmployeeList();
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    if(!this.selectedFiles) return
    let formData = new FormData();
    formData.append('DocumentFile',  this.selectedFiles[0]);
    this.utilityService.imageUpload(formData).subscribe((res) => {
      this.applyLeaveForm.patchValue({
        attachment: res
      });
    }, (err) => {
      console.log(err);
    })
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

  getEmployeeList() {
    this.employeeService.getAllEmployee().subscribe(
      (res: IEmployee[]) => {
        this.EmployeeList = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  get myForm() { return this.applyLeaveForm.controls; }
  get myForm2() { return this.searchEmpForm.controls; }
  searchEmployee(){
    this.submitted2 = true;
    if (this.searchEmpForm.invalid) {
      return;
    } else {
       this.employeeService.searchEmployee(0,this.searchEmpForm.value["empCode"]).subscribe({
        next: res =>{
          console.log(res[0]);
          this.submitted2 = false;
          this.empSearchResult = res[0];
          this.isShow = true;
          this.searchEmpForm.patchValue({
            empId: ""
          });
          this.toastr.successToastr(res['message']);
        },
        error: err =>{
          console.log(err);
          this.toastr.warningToastr(err);
        }
      })
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.applyLeaveForm.invalid) {
      return;
    } else {
      this.applyLeaveService.applyLeave({...this.applyLeaveForm.value,leaveTypeId: parseInt(this.applyLeaveForm.value['leaveTypeId']) , empId: parseInt(this.applyLeaveForm.value["empId"]), leaveDayStatus: Boolean(this.applyLeaveForm.value['leaveDayStatus'])} as IApplyLeave).subscribe({
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
