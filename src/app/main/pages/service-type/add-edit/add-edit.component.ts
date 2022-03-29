import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import { IServiceType } from 'src/app/shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  ServiceTypeForm: FormGroup
  submitted: boolean = false;
  serviceTypeId: number
  constructor(
    public fb: FormBuilder,
    public _router: Router,
    public activeRoute: ActivatedRoute,
    public toast: ToastrManager,
    public ServiceTypeSrv: ServiceTypeService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.serviceTypeId = params['id'];
    })
    if(this.serviceTypeId) this.getServiceTypeDetails(this.serviceTypeId)
  }
  createForm() {
    this.ServiceTypeForm = this.fb.group({
      serviceTypeName: ['', Validators.required],
      serviceShortCode: ['', Validators.required],
      serviceFor: ['', Validators.required]
    })
  }
  get myForm() { return this.ServiceTypeForm.controls; }
  getServiceTypeDetails(serviceTypeId: number) {
    this.ServiceTypeSrv.find(serviceTypeId).subscribe((res) => {
      const serviceTypeDetails = res['data'][0];
      this.ServiceTypeForm.patchValue(serviceTypeDetails);
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }
  addServiceType() {
    this.submitted = true;
    if (this.ServiceTypeForm.invalid) {
      return;
    } else {
      if(this.serviceTypeId) {
        this.ServiceTypeSrv.put({...this.ServiceTypeForm.value, serviceFor: parseInt(`${this.ServiceTypeForm.value['serviceFor']}`), serviceTypeId: parseInt(`${this.serviceTypeId}`)} as IServiceType, this.serviceTypeId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/service-type/"]);
            this.toast.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toast.warningToastr(err);
          }
        })
        return;
      }
      this.ServiceTypeSrv.add({...this.ServiceTypeForm.value, serviceFor: parseInt(`${this.ServiceTypeForm.value['serviceFor']}`)} as IServiceType).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/service-type/"]);
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
