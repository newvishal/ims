import { Component, OnInit, ViewChild } from '@angular/core';

import { DocTypeService } from 'src/app/services/doc-type.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IDocType } from 'src/app/shared/ts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['docTypeId', 'documentType',  'shortCode' , 'registrationNo', 'registrationDateRequire','expiryDateRequire', 'actions'];
  dataSource: MatTableDataSource<IDocType>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public docTypeService: DocTypeService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getDocType();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDocType(){
    this.loading = true;
    this.docTypeService.find(0).subscribe((res: IDocType[]) => {
      const State = res["data"] as IDocType[];
      this.dataSource = new MatTableDataSource(State);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }
  EditDocType(detail: IDocType) {
    console.log(detail)
    this.route.navigate(['dashboard/document-type/addEditDocType'],
     { queryParams: { id: detail['docTypeId'] } })
  }
}
