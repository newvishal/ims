import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-vendor-branch-list',
  templateUrl: './vendor-branch-list.component.html',
  styleUrls: ['./vendor-branch-list.component.scss']
})
export class VendorBranchListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(function(e) {
      $('#vendorBranchexample').DataTable();
    } );
  }

}
