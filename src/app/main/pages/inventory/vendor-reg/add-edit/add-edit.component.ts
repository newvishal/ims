import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StateService } from 'src/app/services/state.service';
import { VendorService } from 'src/app/services/vendor.service';
import { IState, IVendorDetails } from 'src/app/shared/ts';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  VendorForm: FormGroup
  StateList: IState[] = [];
  submitted: boolean = false;
  VendorId: number
  constructor(
    public fb: FormBuilder,
    public _router: Router,
    public activeRoute: ActivatedRoute,
    public toast: ToastrManager,
    public VendorSrv: VendorService,
    public stateService: StateService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.VendorId = params['id'];
    })
    if(this.VendorId) this.getVendorDetails(this.VendorId)
    
    this.getState();
  }
  getState(){
    this.stateService.find().subscribe((res: IState[]) => {
      console.log(res);
      this.StateList = res["data"] as IState[];
    }, (err) => {
      console.log(err)
    });
  } 
  getVendorDetails(VendorId: number) {
     this.VendorSrv.find(VendorId).subscribe((res) => {
       const vendorDetails = res['data'][0];
       this.VendorForm.patchValue(vendorDetails);
       console.log(res);
     }, (err) => {
       console.log(err);
     })
  }
  createForm() {
    this.VendorForm = this.fb.group({
      vendorName: ['', Validators.required],
      emailId: ['', Validators.required],
      panNo: ['', Validators.required],
      regOfficeAddress: ['', Validators.required],
      regStateId: ['', Validators.required],
      approvalStatus: ['', Validators.required]
    })
  }

  get myForm() { return this.VendorForm.controls; }

  addVendor() {
    this.submitted = true;
    if (this.VendorForm.invalid) {
      return;
    } else {
      if(this.VendorId) {
        this.VendorSrv.put({...this.VendorForm.value, vendorId: parseInt(`${this.VendorId}`)} as IVendorDetails, this.VendorId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/inventory/"]);
            this.toast.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toast.warningToastr(err);
          }
        })
        return;
      }
      this.VendorSrv.add({...this.VendorForm.value, regStateId: parseInt(`${this.VendorForm.value['regStateId']}`)} as IVendorDetails).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/inventory/"]);
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
