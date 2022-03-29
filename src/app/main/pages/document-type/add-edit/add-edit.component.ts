import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { DocTypeService } from 'src/app/services/doc-type.service';
import { IDocType } from 'src/app/shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  DoctTypeForm: FormGroup;
  submitted: boolean = false;
  docTypeId: number;
  constructor(
    public fb: FormBuilder,
    public _router: Router,
    public activeRoute: ActivatedRoute,
    public toast: ToastrManager,
    public docTypeSrv: DocTypeService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.docTypeId = params['id'];
    })
    if(this.docTypeId) this.getDocTypeDetails(this.docTypeId)
  }
  getDocTypeDetails(VendorId: number) {
    this.docTypeSrv.find(VendorId).subscribe((res) => {
      const docTypeDetails = res['data'][0];
      this.DoctTypeForm.patchValue(docTypeDetails);
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  createForm() {
    this.DoctTypeForm = this.fb.group({
      documentType: ['', Validators.required],
      shortCode: ['', Validators.required],
      registrationNo: ['', Validators.required],
      registrationDateRequire: ['', Validators.required],
      expiryDateRequire: ['', Validators.required]
    })
  }

  get myForm() { return this.DoctTypeForm.controls; }

  addDocType() {
    this.submitted = true;
    if (this.DoctTypeForm.invalid) {
      return;
    } else {
      if(this.docTypeId) {
        this.docTypeSrv.put({...this.DoctTypeForm.value, docTypeId: parseInt(`${this.docTypeId}`), registrationDateRequire: Boolean(this.DoctTypeForm.get['registrationDateRequire']), expiryDateRequire: Boolean(this.DoctTypeForm.get['expiryDateRequire'])}, this.docTypeId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/document-type/"]);
            this.toast.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toast.warningToastr(err);
          }
        })
        return;
      }
      this.docTypeSrv.add({...this.DoctTypeForm.value,registrationDateRequire: Boolean(this.DoctTypeForm.get['registrationDateRequire']), expiryDateRequire: Boolean(this.DoctTypeForm.get['expiryDateRequire'])}).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/document-type/"]);
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
