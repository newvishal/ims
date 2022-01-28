import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  isLinear = true;
  basicInfo: FormGroup;
  secondFormGroup: FormGroup;
  selectedFiles: any;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.basicInfo = this._formBuilder.group({
      name: [''],
      aboutUs: [''],
      board: [''],
      campusSize: [''],
      classTo: [''],
      classFrom: [''],
      coedStatus: [''],
      established: [''],
      format: [''],
      ownership: [''],
      studentFacultyRatio: ['',]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [''],
    });
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
}

}
