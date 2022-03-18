import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmdialogComponent } from '../shared/component/confirmdialog/confirmdialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmdialogService {

  constructor(public matDialog: MatDialog) { }

  open(height: string = "200px", width: string = "400px",  title: string, message: string, disableClose: boolean = false, showCancel: boolean = false, confirmText: string = 'Ok', cancelText: string = 'Cancel') {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = disableClose;
    dialogConfig.id = "modal-component";
    dialogConfig.height = height;
    dialogConfig.width = width;
    dialogConfig.data = {
        headline: "",
        title: title,
        description: message,
        actionButtonText: confirmText,
        showHideBtn: true,
        showCancel: showCancel,
        cancelText: cancelText
    };
    const modalDialog = this.matDialog.open(ConfirmdialogComponent, dialogConfig);
    modalDialog.componentInstance.changeRef.markForCheck();
    return modalDialog;
  }
}