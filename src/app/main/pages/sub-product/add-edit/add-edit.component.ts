import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { SubProductTypeService } from 'src/app/services/sub-product-type.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ISubProductType, IProductType } from 'src/app/shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  SubProductTypeForm: FormGroup;
  submitted: boolean = false;
  subProductId: number;
  productTypeList: IProductType[] = []
  constructor(
    public fb: FormBuilder,
    public _router: Router,
    public activeRoute: ActivatedRoute,
    public toast: ToastrManager,
    public subprodTypetSrv: SubProductTypeService,
    public prodTypeSrv: ProductTypeService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getProductType();
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.subProductId = params['id'];
    })
    if(this.subProductId) this.getSubProductDetails(this.subProductId)
  }
  getProductType(){
    this.prodTypeSrv.find(0).subscribe((res: IProductType[]) => {
      console.log(res);
      this.productTypeList = res["data"] as IProductType[];
    }, (err) => {
      console.log(err)
    });
  } 
  getSubProductDetails(subProductId: number) {
    this.subprodTypetSrv.find(subProductId).subscribe((res) => {
      const Details = res['data'][0];
      this.SubProductTypeForm.patchValue(Details);
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  createForm() {
    this.SubProductTypeForm = this.fb.group({
      productId: ['', Validators.required],
      subProductName: ['', Validators.required],
      shortCode: ['', Validators.required],
      lfNo: ['', Validators.required],
      status: ['', Validators.required],
      expDateStatus: ['', Validators.required],
      uomId: ['', Validators.required]
    })
  }
  get myForm() { return this.SubProductTypeForm.controls; }

  addSubProductType() {
    this.submitted = true;
    if (this.SubProductTypeForm.invalid) {
      return;
    } else {
      if(this.subProductId) {
        this.subprodTypetSrv.put(
          { 
            ... this.SubProductTypeForm.value,
            subProductId: parseInt(`${this.subProductId}`),
            productId: parseInt(`${this.SubProductTypeForm.value['productId']}`),
            uomId: parseInt(`${this.SubProductTypeForm.value['uomId']}`),
            status: Boolean(this.SubProductTypeForm.get['status'])} as ISubProductType, this.subProductId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/sub-product/"]);
            this.toast.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toast.warningToastr(err);
          }
        })
        return;
      }
      this.subprodTypetSrv.add({ 
        ... this.SubProductTypeForm.value,
        productId: parseInt(`${this.SubProductTypeForm.value['productId']}`),
        uomId: parseInt(`${this.SubProductTypeForm.value['uomId']}`),
        status: Boolean(this.SubProductTypeForm.get['status'])} as ISubProductType).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/sub-product/"]);
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
