 import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DesignationService } from 'src/app/services/designation.service';
import { DistrictService } from 'src/app/services/district.service';
import { StateService } from 'src/app/services/state.service';

import { IState,IDistrict, IEmployee, IDesignation } from 'src/app/shared/ts';

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
  EmployeeForm: IEmployee;
  districtList: IDistrict[]= []
  StateList: IState[]= []
  DesignationList: IDesignation[]= []
  constructor(
    private _formBuilder: FormBuilder,
    public districtService: DistrictService,
    public stateService: StateService,
    public designationService: DesignationService) { }

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
      doj: [''],
    });
    this.employeeDetails = this._formBuilder.group({
      joiningStateId: [],
      stateName: [''],
      joiningDistId: [],
      districtName: [''],
      locationId: [],
      locationName: [''],
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
    this.getDesignations();
    this.getDistricts();
    this.getStates();
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  AddEmployee() {
    const finalData = {
      ...this.basicInfo.value,
      ...this.employeeDetails
    }
    console.log('employee form data ',finalData)
  }

  getDesignations(){
    this.designationService.find().subscribe((res: IDesignation[]) => {
      this.DesignationList = res['data'] as IDesignation[];
    }, (err) => {
      console.log(err);
    });
  }

  getDistricts(){
    this.districtService.find().subscribe((res: IDistrict[]) => {
      this.districtList = res['data'] as IDistrict[];
    }, (err) => {
      console.log(err);
    });
  }

  getStates(){
    this.stateService.find().subscribe((res: IState[]) => {
      this.StateList = res['data'] as IState[];
    }, (err) => {
      console.log(err);
    });
  }

}
