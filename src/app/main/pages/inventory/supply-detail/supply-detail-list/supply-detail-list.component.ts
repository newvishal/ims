import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supply-detail-list',
  templateUrl: './supply-detail-list.component.html',
  styleUrls: ['./supply-detail-list.component.scss']
})
export class SupplyDetailListComponent implements OnInit {
  isShow: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
