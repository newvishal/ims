import { Component, OnInit, ViewChild } from '@angular/core';
import { PageAccessService } from 'src/app/services/page-access.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IPageAccess } from '../../../../shared/ts'
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['pageAccessId','pageTitle','menuId','empName','roleName','status','actions'];
  dataSource: MatTableDataSource<IPageAccess>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public pageAccessService: PageAccessService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getPageAccess();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getPageAccess(){
    this.loading = true;
    this.pageAccessService.find(0).subscribe((res: IPageAccess[]) => {
      const PageAccess = res['data'] as IPageAccess[];
      this.dataSource = new MatTableDataSource(PageAccess);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }
  EditPageAccess(detail: IPageAccess) {
    console.log(detail)
    this.route.navigate(['dashboard/page-access/addEditPageAccess'],
     { queryParams: { id: detail['pageAccessId'] } })
  }

}
