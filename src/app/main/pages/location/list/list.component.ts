import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { ILocation } from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['locationId', 'locationName',  'locTypeId' , 'stateId' , 'districtId', 'shortCode', 'locationCategory', 'actions'];
  dataSource: MatTableDataSource<ILocation>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public locationService: LocationService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getLocations();
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

  getLocations(){
    this.loading = true;
    this.locationService.find().subscribe((res: ILocation[]) => {
      const Location = res as ILocation[];
      this.dataSource = new MatTableDataSource(Location);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditLocation(detail: ILocation) {
    console.log(detail)
    this.locationService.saveDetails(detail);
    this.route.navigate(['dashboard/location/addEditLocation'])
  }

}
