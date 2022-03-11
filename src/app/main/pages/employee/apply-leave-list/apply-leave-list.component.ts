import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplyLeaveService } from 'src/app/services/apply-leave.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IApplyLeave } from '../../../../shared/ts';
@Component({
  selector: 'app-apply-leave-list',
  templateUrl: './apply-leave-list.component.html',
  styleUrls: ['./apply-leave-list.component.scss']
})
export class ApplyLeaveListComponent implements OnInit {
  displayedColumns: string[] = ['leaveApplyId', 'leaveTypeId', 'empId', 'dateFrom','dateTo','leaveDayStatus', 'actions'];
  dataSource: MatTableDataSource<IApplyLeave>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public employeeService: ApplyLeaveService, public route: Router) { }
  loadingBanks: boolean = false;
 
  isShow: boolean = false;
  
  ngOnInit(): void {
    this.getEmployee();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEmployee(){
    this.loadingBanks = true;
    this.employeeService.getAllAppliedLeave().subscribe((res: IApplyLeave[]) => {
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

  approveLeave(detail: any) {
    console.log(detail)
    // this.bankService.saveBankById(detail);
    this.route.navigate(['dashboard/employee/apply-leave',detail])
  }
}
