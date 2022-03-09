import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { LocationTypeService } from 'src/app/services/location-type.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {ILocationType} from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['locTypeId', 'locationTypeName', 'shortCode', 'status', 'actions'];
  dataSource: MatTableDataSource<ILocationType>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public locationTypeService: LocationTypeService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getLocationType();
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

  getLocationType(){
    this.loading = true;
    this.locationTypeService.find().subscribe((res: ILocationType[]) => {
      const LocationType = res['data'] as ILocationType[];
      this.dataSource = new MatTableDataSource(LocationType);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditLocationType(detail: ILocationType) {
    console.log(detail)
    this.locationTypeService.saveDetails(detail);
    this.route.navigate(['dashboard/location-type/addEditLocationType'])
  }


}
