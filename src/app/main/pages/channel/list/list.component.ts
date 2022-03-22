import { Component, OnInit, ViewChild } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IChannel, IDistrict } from '../../../../shared/ts'
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['channelId', 'channelName','shortCode','actions'];
  dataSource: MatTableDataSource<IChannel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public chanelService: ChannelService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getChannel();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getChannel(){
    this.loading = true;
    this.chanelService.find(0).subscribe((res: IChannel[]) => {
      const District = res['data'] as IChannel[];
      this.dataSource = new MatTableDataSource(District);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });
  }
  EditChannel(detail: IChannel) {
    console.log(detail)
    this.route.navigate(['dashboard/channel/addEditChannel'],
     { queryParams: { id: detail['channelId'] } })
  }
}
