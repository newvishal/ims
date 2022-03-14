import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { IEmployee } from 'src/app/shared/ts';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  isLinear = true;
  basicInfo: FormGroup;
  employeeDetails: FormGroup;
  selectedFiles: any;
  EmployeeForm: IEmployee
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.basicInfo = this._formBuilder.group({
      empName: ['', Validators.required],
      empFatherName: ['', Validators.required],
      dob: ['', Validators.required],
      mobNo: ['', Validators.required],
      emailId: ['', Validators.required],
      gender: [''],
      image: [''],
      whatsAppNo: [''],
      designationId: [''],
      address1: [''],
      address2: [''],
      districtId: [''],
      stateId: [''],
      pinCode: [''],
      esiNo: [''],
      pfNo: [''],
      serviceStatus: [''],
      status: [],
      doj: ['']
    });
    this.employeeDetails = this._formBuilder.group({
      joiningStateId: [],
      stateName: [''],
      joiningDistId: [],
      districtName: [''],
      locationId: [],
      locationName: [''],
      cl: [''],
      el: [''],
      sl: [''],
      pl: [''],
      panNo: ['', Validators.required],
      channel: [''],
      entity: [''],
      aadharNo: [],
      bankName: [],
      ifscCode: [''],
      accountNo: [''],
      officialEmailId: [''],
      empDesigStatus: [],
      registrationDate: [''],
      expDate: ['']
    });
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
}

}
