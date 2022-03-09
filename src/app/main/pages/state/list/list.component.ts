import { Component, OnInit, ViewChild } from '@angular/core';

import { StateService } from 'src/app/services/state.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IState } from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['stateId', 'stateName',  'shortCode' , 'status', 'actions'];
  dataSource: MatTableDataSource<IState>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public stateService: StateService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getState();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getState(){
    this.loading = true;
    this.stateService.find().subscribe((res: IState[]) => {
      console.log(res);
      const State = res["data"] as IState[];
      this.dataSource = new MatTableDataSource(State);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }

  EditState(detail: IState) {
    console.log(detail)
    this.stateService.saveDetails(detail);
    this.route.navigate(['dashboard/state/addEditState'])
  }
}
