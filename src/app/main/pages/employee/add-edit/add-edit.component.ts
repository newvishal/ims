 import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BankService } from 'src/app/services/bank.service';
import { DesignationService } from 'src/app/services/designation.service';
import { DistrictService } from 'src/app/services/district.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LocationTypeService } from 'src/app/services/location-type.service';
import { LocationService } from 'src/app/services/location.service';
import { StateService } from 'src/app/services/state.service';

import { IState,IDistrict, IEmployee, IDesignation, ILocation, ILocationType, IBank } from 'src/app/shared/ts';

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
  LocationTypeList: ILocationType[]= []
  LocationList: ILocation[]= []
  BankList: IBank[] = []
  EmpId: string
  constructor(
    public employeeService: EmployeeService,
    private _formBuilder: FormBuilder,
    public districtService: DistrictService,
    public stateService: StateService,
    public designationService: DesignationService,
    public locationTypeService: LocationTypeService,
    public locationService: LocationService,
    public bankService: BankService,
    public activeRoute: ActivatedRoute,
    public toast: ToastrManager) { }

  ngOnInit(): void {
    this.basicInfo = this._formBuilder.group({
      EmpName: ['', Validators.required],
      EmpFatherName: ['', Validators.required],
      DOB: ['', Validators.required],
      MobNo: ['', Validators.required],
      EmailId: ['', Validators.required],
      Gender: [''],
      WhatsAppNo: [''],
      DesignationId: [''],
      Address1: [''],
      Address2: [''],
      DistrictId: [''],
      StateId: [''],
      PinCode: [''],
      ESINo: [''],
      PFNo: [''],
      ServiceStatus: [''],
      DOJ: [''],
    });
    this.employeeDetails = this._formBuilder.group({
      JoiningStateId: ['', Validators.required],
      StateName: [''],
      JoiningDistId: ['', Validators.required],
      DistrictName: [''],
      LocationId: ['', Validators.required],
      LocationName: [''],
      PANNo: ['', Validators.required],
      Channel: [''],
      Entity: [''],
      AadharNo: ['', Validators.required],
      BankName: ['', Validators.required],
      IFSCCode: [''],
      AccountNo: [''],
      OfficialEmailId: [''],
      EmpDesigStatus: ['', Validators.required],
      RegistrationDate: [''],
      ExpDate: ['']
    });
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.EmpId = params['id'];
    })
    
    this.getDesignations();
    this.getDistricts();
    this.getStates();
    this.getLocations();
    this.getBanks();
    if(this.EmpId) this.getEmployeeDetails(this.EmpId);
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  getEmployeeDetails(EmpId: string) {
    this.employeeService.getById(EmpId).subscribe((res) => {
      const empDetails = res[0];
      this.basicInfo.patchValue(empDetails);
      this.employeeDetails.patchValue(empDetails);
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  AddEmployee() {
    const finalData = {
      ...this.basicInfo.value,
      ...this.employeeDetails.value
    };
    let formData = new FormData();
    Object.keys(finalData).forEach((key) => {
      formData.append(`${key}`, finalData[key]);
    })
    if(this.selectedFiles) formData.append('image',  this.selectedFiles[0]);
    this.employeeService.addEmployee(formData).subscribe((res) => {
      this.toast.successToastr('Created Successfully');
    }, (err) => {
      this.toast.errorToastr('Somthing Went Wrong');
    })
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

  getLocations(){
    this.locationService.find().subscribe((res: ILocation[]) => {
      this.LocationList = res as ILocation[];
    }, (err) => {
      console.log(err);
    });
  }

  getBanks(){
    this.bankService.getAllBank().subscribe((res: IBank[]) => {
      this.BankList = res['data'] as IBank[];
    }, (err) => {
      console.log(err);
    });
  } 


}
