import { Component, OnInit, ViewChild } from '@angular/core';

import { DesignationService } from 'src/app/services/designation.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IChannel, IDesignation } from '../../../../shared/ts'
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['designationId', 'designationName','shortCode','category','actions'];
  dataSource: MatTableDataSource<IDesignation>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public designationService: DesignationService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getDesignation();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getDesignation(){
    this.loading = true;
    this.designationService.find(0).subscribe((res: IDesignation[]) => {
      const Designation = res['data'] as IDesignation[];
      this.dataSource = new MatTableDataSource(Designation);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }
  EditDesignation(detail: IDesignation) {
    console.log(detail)
    this.route.navigate(['dashboard/designation/addEditDesignation'],
     { queryParams: { id: detail['designationId'] } })
  }
}
