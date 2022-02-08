import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }
  isShow: boolean = false;
  showDropdown: boolean = false;
  ngOnInit(): void {
    $(function(e) {
      $('#approveLeaveexample').DataTable();
    } );
  }
  showPopup(e){
     if(e.target.value === "Reject"){
        this.isShow = true;
     }
     if(e.target.value === "Approve"){
      this.isShow = false;
    }
  }

}
