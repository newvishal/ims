import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { StateService } from 'src/app/services/state.service';
import { DistrictService } from 'src/app/services/district.service';
import { LocationService } from 'src/app/services/location.service';
import { LocationTypeService } from 'src/app/services/location-type.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { IState } from 'src/app/shared/ts';
import { UserRoleAccessService } from 'src/app/services/user-role-access.service';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  UserRoleAccessForm: FormGroup;
  submitted = false;
  userRoleAccessId: number;
  empList = [];
  stateList = [];
  districtList = [];
  locationList = [];
  locationTypeList = [];
  constructor(
    public fb: FormBuilder,
    public _router: Router,
    public activeRoute: ActivatedRoute,
    public toast: ToastrManager,
    public userRoleAccessService: UserRoleAccessService,
    public employeeService: EmployeeService,
    public stateService: StateService,
    public districtService: DistrictService,
    public locationService: LocationService,
    public locationTypeService: LocationTypeService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllEmp();
    this.getLocationList();
    this.getSateList();
    this.getDistrict();
    this.getLocationTypeList();
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.userRoleAccessId = params['id'];
    });
  }

  createForm() {
    this.UserRoleAccessForm = this.fb.group({
      empId: ['', Validators.required],
      roleId: ['', Validators.required],
      assignedStates: ['', Validators.required],
      assignedDistricts: ['', Validators.required],
      assignedLocations: ['', Validators.required],
      assignedLocationType: ['', Validators.required],
    });
  }
  get myForm() { return this.UserRoleAccessForm.controls; }
  getAllEmp(){
    this.employeeService.getAllEmployee().subscribe((res)=>{
      this.empList = Object.assign([],res);
    },(err)=>{});
  }
  getSateList() {
    this.stateService.find().subscribe(
      (res: IState[]) => {
        this.stateList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  // getDistrictByStateList(stateId: string) {
  //   console.log(stateId);
  //   this.districtService.findDistrictByState(parseInt(stateId)).subscribe(
  //     (res) => {
  //       this.districtList = res['data'];
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   )
  // }

  getDistrict() {
    this.districtService.find().subscribe(
      (res) => {
        this.districtList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getLocationList() {
    this.locationService.find().subscribe(
      (res) => {
        this.locationList = res;
        console.log(this.locationList);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getLocationTypeList() {
    this.locationTypeService.find().subscribe(
      (res) => {
        this.locationTypeList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  addUserRoleAccess(){
    this.submitted = true;
    if (this.UserRoleAccessForm.invalid) {
      return;
    } else {
      if(this.userRoleAccessId) {
        this.userRoleAccessService.put({...this.UserRoleAccessForm.value, userRoleAccessId: parseInt(`${this.userRoleAccessId}`), empId: parseInt(this.UserRoleAccessForm.value['empId']),roleId: parseInt(this.UserRoleAccessForm.value['roleId'])}, this.userRoleAccessId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/user-role-access"]);
            this.toast.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toast.warningToastr(err);
          }
        })
        return;
      }
      this.userRoleAccessService.add({...this.UserRoleAccessForm.value,empId: parseInt(this.UserRoleAccessForm.value['empId']),roleId: parseInt(this.UserRoleAccessForm.value['roleId'])}).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/user-role-access"]);
          this.toast.successToastr(res['message']);
        },
        error: err =>{
          console.log(err);
          this.toast.warningToastr(err);
        }
      })
    }

  }
}
