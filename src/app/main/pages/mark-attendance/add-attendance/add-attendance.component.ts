import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss']
})
export class AddAttendanceComponent implements OnInit {
  time:boolean = false;
  reason:boolean = false;
  constructor() { }
  curDate=new Date();
  ngOnInit(): void {
  }
  showPopup(e){
    if(e.target.value === "Present"){
       this.time = true;
       this.reason = false;
    }
    if(e.target.value === "Absent"){
     this.reason = true;
     this.time = false;
    }
    if(e.target.value === "Leave"){
      this.reason = true;
      this.time = false;
    }
  }
}
