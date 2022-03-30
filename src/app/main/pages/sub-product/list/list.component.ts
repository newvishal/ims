import { Component, OnInit, ViewChild } from '@angular/core';
import { SubProductTypeService } from 'src/app/services/sub-product-type.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { ISubProductType } from 'src/app/shared/ts';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['subProductId', 'productId',  'subProductName' , 'shortCode', 'lfNo','status','expDateStatus','uomId', 'actions'];
  dataSource: MatTableDataSource<ISubProductType>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public subProdService: SubProductTypeService, public route: Router) { }
  loading: boolean = false;

  ngOnInit(): void {
    this.getSubProductType();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSubProductType(){
    this.loading = true;
    this.subProdService.find(0).subscribe((res: ISubProductType[]) => {
      const SubproductType = res["data"] as ISubProductType[];
      this.dataSource = new MatTableDataSource(SubproductType);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }
  EditSubProductType(detail: ISubProductType) {
    console.log(detail)
    this.route.navigate(['dashboard/sub-product/addEditSubProduct'],
     { queryParams: { id: detail['subProductId'] } })
  }

}
