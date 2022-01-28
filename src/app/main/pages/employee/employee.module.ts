import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeRoutingModule } from './employee-routing.module';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpDocListComponent } from './emp-doc-list/emp-doc-list.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ApplyLeaveListComponent } from './apply-leave-list/apply-leave-list.component';


@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent,
    EmpDocListComponent,
    UploadDocComponent,
    ApplyLeaveComponent,
    ApplyLeaveListComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
