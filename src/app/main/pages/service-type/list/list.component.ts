import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceTypeService } from 'src/app/services/service-type.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IServiceType } from 'src/app/shared/ts';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['serviceTypeId', 'serviceTypeName',  'serviceShortCode' , 'serviceFor','actions'];
  dataSource: MatTableDataSource<IServiceType>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public serviceTypeService: ServiceTypeService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getServiceType();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getServiceType(){
    this.loading = true;
    this.serviceTypeService.find(0).subscribe((res: IServiceType[]) => {
      const ServiceType = res["data"] as IServiceType[];
      this.dataSource = new MatTableDataSource(ServiceType);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }

  EditServiceType(detail: IServiceType) {
    console.log(detail)
    this.route.navigate(['dashboard/service-type/addEditServiceType'],
     { queryParams: { id: detail['serviceTypeId'] } })
  }

}
