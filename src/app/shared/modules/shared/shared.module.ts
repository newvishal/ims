import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { ConfirmdialogComponent } from '../../component/confirmdialog/confirmdialog.component';
import { ConfirmdialogService } from 'src/app/services/confirmdialog.service';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    ConfirmdialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSnackBarModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule
  ],
  providers: [ConfirmdialogService],
  entryComponents: [ConfirmdialogComponent],
  exports: [ MatDialogModule,ReactiveFormsModule, MatProgressSpinnerModule,MatTooltipModule,MatIconModule, MatFormFieldModule, 
            MatTableModule, MatPaginatorModule, MatInputModule, MatSortModule, MatCheckboxModule, MatOptionModule,MatStepperModule,
            MatSnackBarModule,MatButtonModule,MatSelectModule,MatChipsModule]
})
export class SharedModule { }
