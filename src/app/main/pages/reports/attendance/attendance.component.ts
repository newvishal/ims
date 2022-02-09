import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  showResult: Boolean = false;
  constructor() { }

  ngOnInit(): void {
    $(function(e) {
      $('#attendanceexample').DataTable();
    } );
  }

}
