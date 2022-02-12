import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-received',
  templateUrl: './stock-received.component.html',
  styleUrls: ['./stock-received.component.scss']
})
export class StockReceivedComponent implements OnInit {
  isShow: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
