import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { LeaveTypeService } from 'src/app/services/leave-type.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { ILeaveType } from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['leaveTypeId', 'leaveTypeName', 'genderApplicable', 'carryForwardStatus', 'shortCode', 'status', 'actions'];
  dataSource: MatTableDataSource<ILeaveType>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public leaveTypeService: LeaveTypeService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getLeaveTypes();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getLeaveTypes(){
    this.loading = true;
    this.leaveTypeService.find().subscribe((res: ILeaveType[]) => {
      const LeaveType = res['data'] as ILeaveType[];
      this.dataSource = new MatTableDataSource(LeaveType);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditLeaveType(detail: ILeaveType) {
    console.log(detail)
    this.leaveTypeService.saveDetails(detail);
    this.route.navigate(['dashboard/leave-type/addEditLeaveType'])
  }


}
