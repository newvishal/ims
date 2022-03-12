import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IProductType } from '../../../../shared/ts';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['productId', 'productName', 'shortCode', 'type', 'status', 'actions'];
  dataSource: MatTableDataSource<IProductType>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public productTypeService: ProductTypeService, public route: Router) { }
  loadingBanks: boolean = false
  ngOnInit(): void {
    this.getProductType();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getProductType(){
    this.loadingBanks = true;
    this.productTypeService.find(0).subscribe((res: IProductType[]) => {
      console.log(res);
      const ProductType = res['data'] as IProductType[];
      this.dataSource = new MatTableDataSource(ProductType);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingBanks = false;
    }, (err) => {
      console.log(err)
    });

  }

  // EditBank(detail: IProductType) {
  //   console.log(detail)
  //   this.productTypeService.saveBankById(detail);
  //   this.route.navigate(['dashboard/bank/addEditBank'])
  // }
}
