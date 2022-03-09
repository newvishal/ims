import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { LocationTypeService } from 'src/app/services/location-type.service';

import {ILocationType} from '../../../../shared/ts';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  LocationTypeForm: FormGroup;
  submitted = false;
  bsubject: ILocationType;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private locationTypeService: LocationTypeService,private _router: Router) { }

  ngOnInit(): void {
    this.LocationTypeForm = this.formBuilder.group({
      locationType: [null, Validators.required],
      shortCode: ['', Validators.required],
    });

    this.patchLocalStorageData();
  }

  patchLocalStorageData() {
    this.locationTypeService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.LocationTypeForm.patchValue(this.bsubject);
      console.log(this.bsubject)
    });
  }
  
  get myForm() { return this.LocationTypeForm.controls; }

  addLocationType() {
    this.submitted = true;
    if (this.LocationTypeForm.invalid) {
      return;
    } else {
      if(this.bsubject.locTypeId) {
        this.locationTypeService.put({...this.LocationTypeForm.value, locTypeId: this.bsubject.locTypeId} as ILocationType, this.bsubject.locTypeId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/location-type/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.locationTypeService.saveDetails({locTypeId: '', locationTypeName: "", shortCode: '', status: false })
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.locationTypeService.add({...this.LocationTypeForm.value} as ILocationType).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/location-type/"]);
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
