import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplyLeaveService } from 'src/app/services/apply-leave.service';
import { ApproveLeaveService } from "src/app/services/approve-leave.service";
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IApplyLeave, IApprovedLeave } from '../../../../shared/ts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmdialogService } from 'src/app/services/confirmdialog.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['leaveApplyId', 'leaveTypeId', 'empId','dateFrom','dateTo','leaveDayStatus','approvalStatus','actions'];
  dataSource: MatTableDataSource<IApplyLeave>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public confirmModalServ: ConfirmdialogService,public toastr: ToastrManager,public applyLeaveService: ApplyLeaveService,public approveLeaveService:ApproveLeaveService, public route: Router, public fb: FormBuilder) { }
  loadingBanks: boolean = false;
  isShow: boolean = false;
  showDropdown: boolean = false;
  reasonForm: FormGroup;
  remark: string = "";
  rejectdObj = {};
  ngOnInit(): void {
    this.getApplyLeave();
    this.reasonForm = this.fb.group({
      remark: ['',Validators.required]
    })
  }

  getApplyLeave(){
    this.loadingBanks = true;
    this.applyLeaveService.getAllAppliedLeave().subscribe((res: IApplyLeave[]) => {
      console.log(res);
      const Bank = res['data'] as IApplyLeave[];
      this.dataSource = new MatTableDataSource(Bank);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingBanks = false;
    }, (err) => {
      console.log(err)
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showPopup(e,data: any){
     if(e.target.value === "0"){
        this.isShow = true;
        console.log(data);
        const {leaveApplyId} = data;
        this.rejectdObj = {
          leaveApplyId: leaveApplyId,
          approvalStatus: 0,
          remark: this.remark
        }
        console.log(this.rejectdObj);
     }
     if(e.target.value === "1"){
      this.isShow = false;
      console.log(data);
      const {leaveApplyId} = data;
      let approvedObj = {
        leaveApplyId: leaveApplyId,
        approvalStatus: 1,
        remark: this.remark
      }
      console.log(approvedObj);
      this.approvedLeave(approvedObj);
    }
  }
  
  approvedLeave(data){
    console.log(data);
    const modalRef = this.confirmModalServ.open("200px", "400px", "Confirm", "Are you Sure to Approved this leave ?", true, true, "ok", "cancel");
    modalRef.afterClosed().subscribe(result => {
    const { event } = result;
    if(event === 'Close') {
        return;
    }
    this.approveLeaveService.approvedLeave(data).subscribe({
      next: res =>{
        this.getApplyLeave();
        this.showDropdown = false;
        this.toastr.successToastr(res['message']);
      },
      error: err =>{
        console.log(err);
        this.toastr.warningToastr(err);
      }
    });
    });
  }

  onSubmit(){
    let finalObj = {
      ...this.rejectdObj,
      remark: this.reasonForm.value['remark']
    }
    console.log(finalObj as IApprovedLeave);
    this.isShow = false;
    console.log(finalObj);
    const modalRef = this.confirmModalServ.open("200px", "400px", "Confirm", "Are you Sure to Reject this leave ?", true, true, "ok", "cancel");
    modalRef.afterClosed().subscribe(result => {
      const { event } = result;
      if(event === 'Close') {
          return;
      }
      this.approveLeaveService.approvedLeave(finalObj as IApprovedLeave).subscribe({
        next: res =>{
          this.getApplyLeave();
          this.showDropdown = false;
          this.toastr.successToastr(res['message']);
        },
        error: err =>{
          console.log(err);
          this.toastr.warningToastr(err);
        }
      })
      this.reasonForm.reset({
        remark: ""
      });
    });
    
  }
}
