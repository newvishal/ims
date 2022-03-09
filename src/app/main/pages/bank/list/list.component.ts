import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { BankService } from 'src/app/services/bank.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {IBank} from '../../../../shared/ts';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['bankId', 'bankName', 'shortCode', 'status', 'actions'];
  dataSource: MatTableDataSource<IBank>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public bankService: BankService, public route: Router) { }
  loadingBanks: boolean = false;
  ngOnInit(): void {
    this.getBanks();
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

  getBanks(){
    this.loadingBanks = true;
    this.bankService.getAllBank().subscribe((res: IBank[]) => {
      console.log(res);
      const Bank = res['data'] as IBank[];
      this.dataSource = new MatTableDataSource(Bank);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingBanks = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditBank(detail: IBank) {
    console.log(detail)
    this.bankService.saveBankById(detail);
    this.route.navigate(['dashboard/bank/addEditBank'])
  }

}
