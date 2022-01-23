import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTypeRoutingModule } from './document-type-routing.module';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';


@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    DocumentTypeRoutingModule
  ]
})
export class DocumentTypeModule { }
