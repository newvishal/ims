import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { DesignationService } from 'src/app/services/designation.service';
import { IDesignation } from 'src/app/shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  DesignationForm: FormGroup
  submitted: boolean = false;
  designationId: number
  constructor(
    public fb: FormBuilder,
    public _router: Router,
    public activeRoute: ActivatedRoute,
    public toast: ToastrManager,
    public DesignationSrv: DesignationService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.designationId = params['id'];
    });
    this.getDesignationDetails(this.designationId);
  }

  createForm() {
    this.DesignationForm = this.fb.group({
      designationName: ['', Validators.required],
      shortCode: [''],
      category: ['', Validators.required]
    })
  }

  getDesignationDetails(designationId: number) {
    this.DesignationSrv.find(designationId).subscribe((res) => {
      const designationDetails = res['data'][0];
      this.DesignationForm.patchValue(designationDetails);
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  get myForm() { return this.DesignationForm.controls; }

  addDesignation() {
    this.submitted = true;
    if (this.DesignationForm.invalid) {
      return;
    } else {
      if(this.designationId) {
        this.DesignationSrv.put({...this.DesignationForm.value, designationId: parseInt(`${this.designationId}`)} as IDesignation, this.designationId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/designation/"]);
            this.toast.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toast.warningToastr(err);
          }
        })
        return;
      }
      this.DesignationSrv.add(this.DesignationForm.value).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/designation/"]);
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
