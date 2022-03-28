import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

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

  displayedColumns: string[] = ['menuId','menuName','redirectURL','isActive','actions'];
  dataSource: MatTableDataSource<IMenu>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public menuService: MenuService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getMenu();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getMenu(){
    this.loading = true;
    this.menuService.find(0).subscribe((res: IMenu[]) => {
      const Menu = res['data'] as IMenu[];
      this.dataSource = new MatTableDataSource(Menu);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }
  EditMenu(detail: IMenu) {
    console.log(detail)
    this.route.navigate(['dashboard/menu/addEditMenu'],
     { queryParams: { id: detail['menuId'] } })
  }

}
