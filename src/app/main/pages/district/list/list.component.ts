import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { DistrictService } from 'src/app/services/district.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IDistrict } from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['districtId', 'stateId', 'districtName', 'shortCode',  'status', 'actions'];
  dataSource: MatTableDataSource<IDistrict>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public districtService: DistrictService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getDistricts();
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

  getDistricts(){
    this.loading = true;
    this.districtService.find().subscribe((res: IDistrict[]) => {
      const District = res['data'] as IDistrict[];
      this.dataSource = new MatTableDataSource(District);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditDistrict(detail: IDistrict) {
    console.log(detail)
    this.districtService.saveDetails(detail);
    this.route.navigate(['dashboard/district/addEditDist'])
  }

}
