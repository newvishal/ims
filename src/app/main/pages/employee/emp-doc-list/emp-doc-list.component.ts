import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-emp-doc-list',
  templateUrl: './emp-doc-list.component.html',
  styleUrls: ['./emp-doc-list.component.scss']
})
export class EmpDocListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(function(e) {
      $('#example').DataTable();
    } );
  }

}
