import { Component, OnInit, ViewChild } from '@angular/core';

import { VendorService } from 'src/app/services/vendor.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IVendorDetails } from 'src/app/shared/ts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['vendorId', 'vendorName',  'emailId' , 'panNo', 'regStateId','approvalStatus', 'actions'];
  dataSource: MatTableDataSource<IVendorDetails>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public vendorService: VendorService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getState();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getState(){
    this.loading = true;
    this.vendorService.find(0).subscribe((res: IVendorDetails[]) => {
      const State = res["data"] as IVendorDetails[];
      this.dataSource = new MatTableDataSource(State);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }

  EditState(detail: IVendorDetails) {
    console.log(detail)
    this.route.navigate(['dashboard/inventory/addEditVendorReg'],
     { queryParams: { id: detail['vendorId'] } })
  }
}
