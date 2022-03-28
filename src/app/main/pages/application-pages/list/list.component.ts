import { Component, OnInit, ViewChild } from '@angular/core';

import { ApplicationPagesService } from 'src/app/services/application-pages.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IMenu } from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['pageId','pageTitle','pageType','pageURL','menuId','status','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public applicationPagesService: ApplicationPagesService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getApplicationPages();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getApplicationPages(){
    this.loading = true;
    this.applicationPagesService.find(0).subscribe((res) => {
      const ApplicationPages = res['data'];
      this.dataSource = new MatTableDataSource(ApplicationPages);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }
  EditApplicationPages(detail: any) {
    console.log(detail)
    this.route.navigate(['dashboard/application-pages/addEditApplicationPage'],
     { queryParams: { id: detail['pageId'] } })
  }

}
