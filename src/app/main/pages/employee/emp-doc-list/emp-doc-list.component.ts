import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IEmployeeDocument } from '../../../../shared/ts'
import { Router } from '@angular/router';
import { EmployeeDocumentService } from 'src/app/services/employee-document.service';

@Component({
  selector: 'app-emp-doc-list',
  templateUrl: './emp-doc-list.component.html',
  styleUrls: ['./emp-doc-list.component.scss']
})
export class EmpDocListComponent implements OnInit {
  displayedColumns: string[] = ['empId', 'docTypeId','documentPath','expiryDate','registrationDate','documentShortCode','status','actions'];
  dataSource: MatTableDataSource<IEmployeeDocument>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public empDocService: EmployeeDocumentService, public route: Router) { }
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
    this.empDocService.find(0).subscribe((res: IEmployeeDocument[]) => {
      const Designation = res as IEmployeeDocument[];
      this.dataSource = new MatTableDataSource(Designation);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }

  EditEmployeeDoc(detail: IEmployeeDocument) {
    console.log(detail)
    this.route.navigate(['dashboard/employee/doc-upload'],
     { queryParams: { id: detail['empDocId'] } })
  }

}
