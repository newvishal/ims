import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-apply-leave-list',
  templateUrl: './apply-leave-list.component.html',
  styleUrls: ['./apply-leave-list.component.scss']
})
export class ApplyLeaveListComponent implements OnInit {

  constructor() { }
  isShow: boolean = false;
  
  ngOnInit(): void {
    $(function(e) {
      $('#applyLeaveListexample').DataTable();
    } );
  }
}
