import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.scss']
})
export class ConfirmdialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public changeRef: ChangeDetectorRef
  ) { 
    console.log(this.modalData);
  }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close({event:'Accept', data: this.modalData});
  }

  close() {
    this.dialogRef.close({event:'Close', data: this.modalData});
  }
}
