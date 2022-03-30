import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveLimitService } from 'src/app/services/leave-limit.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { ILeaveLimit } from 'src/app/shared/ts';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['empLeaveApplicableId', 'leaveTypeName',  'empTypeId' , 'maxLeaveAllowed', 'perMonthLeaveAllowed','carryForwardMaxLimit', 'actions'];
  dataSource: MatTableDataSource<ILeaveLimit>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public leaveLimitService: LeaveLimitService, public route: Router) { }
  loading: boolean = false;

  ngOnInit(): void {
    this.getLeaveLimit();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getLeaveLimit(){
    this.loading = true;
    this.leaveLimitService.find(0).subscribe((res: ILeaveLimit[]) => {
      const LeaveLimit = res["data"] as ILeaveLimit[];
      this.dataSource = new MatTableDataSource(LeaveLimit);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }
  EditDocType(detail: ILeaveLimit) {
    console.log(detail)
    this.route.navigate(['dashboard/leave-limit/addEditLeaveLimit'],
     { queryParams: { id: detail['empLeaveApplicableId'] } })
  }
}
