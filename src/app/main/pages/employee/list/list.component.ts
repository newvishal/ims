import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IEmployee } from '../../../../shared/ts'
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['EmpId', 'EmpName',  'DOJ' , 'EmailId' , 'ExpDate', 'AadharNo', 'ServiceStatus', 'actions'];
  dataSource: MatTableDataSource<IEmployee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public employeeService: EmployeeService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getEmployees();
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

  getEmployees(){
    this.loading = true;
    this.employeeService.getAllEmployee().subscribe((res: any[]) => {
      const Employee = res as IEmployee[];
      this.dataSource = new MatTableDataSource(Employee);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditEmployee(emp: string) {
    this.route.navigate(['dashboard/employee/addEditEmployee']);
    this.employeeService.saveEmployeeById(emp);
  }

}
