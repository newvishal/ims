import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(function(e) {
      $('#empexample').DataTable();
    } );
  }

}
