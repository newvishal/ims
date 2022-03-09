import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { DistrictService } from 'src/app/services/district.service';
import { LocationTypeService } from 'src/app/services/location-type.service';
import { LocationService } from 'src/app/services/location.service';
import { StateService } from 'src/app/services/state.service';
import {IDistrict, IState ,ILocation, ILocationType} from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  LocationForm: FormGroup;
  submitted = false;
  bsubject: ILocation;
  DistrictList: IDistrict[] = [];
  LocationTypeList: ILocationType[] = [];
  StateList: IState[] = [];
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private locationService: LocationService,
    public districtService: DistrictService,
    public locationTypeService: LocationTypeService,
    public stateService: StateService,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this.LocationForm = this.formBuilder.group({
      locationName: ['', Validators.required],
      locTypeId: ['', Validators.required],
      state: ['', Validators.required],
      districtId: ['', Validators.required],  
      shortCode: ['', Validators.required],
      locationCategory: ['', Validators.required]
    });
    this.patchLocalStorageData();

    this.getDistrictList();
    this.getLocationTypeList();
    this.getSateList();
  }

  getLocationTypeList() {
    this.locationTypeService.find().subscribe(
      (res: ILocationType[]) => {
        this.LocationTypeList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }
  getSateList() {
    this.stateService.find().subscribe(
      (res: IState[]) => {
        this.StateList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getDistrictList() {
    this.districtService.find().subscribe(
      (res: IDistrict[]) => {
        this.DistrictList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  patchLocalStorageData() {
    this.locationService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      console.log(this.bsubject);
      this.LocationForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.LocationForm.controls; }

  addLocation() {
    this.submitted = true;
    if (this.LocationForm.invalid) {
      return;
    } else {
      if(this.bsubject.locationId) {
        console.log(this.bsubject);
        this.locationService.put({...this.LocationForm.value, locationId: this.bsubject.locationId} as ILocation, this.bsubject.locationId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/location/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.locationService.saveDetails({
              locationId: '',
              stateId: '',
              districtId: '',
              locTypeId: '',
              locationName: "",
              shortCode: "",
              locationCategory: ""
            });
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.locationService.add({...this.LocationForm.value}).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/location/"]);
          this.toastr.successToastr(res['message']);
        },
        error: err =>{
          console.log(err);
          this.toastr.warningToastr(err);
        }
      })
    }

  }


}
