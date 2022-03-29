import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

import { UserRoleAccessService } from 'src/app/services/user-role-access.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['userRoleAccessId','empId','userId','roleId','assignedStates','assignedDistricts','assignedLocations','assignedLocationType','assignedBy','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public userRoleAccessService: UserRoleAccessService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getUserROleAccess();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getUserROleAccess(){
    this.loading = true;
    this.userRoleAccessService.find(0).subscribe((res) => {
      const UserRoleAccess = res['data'];
      this.dataSource = new MatTableDataSource(UserRoleAccess);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }
  EditUserRoleAccess(detail: any) {
    console.log(detail)
    this.route.navigate(['dashboard/user-role-access/addEditUserRoleAccess'],
     { queryParams: { id: detail['userRoleAccessId'] } })
  }
}
