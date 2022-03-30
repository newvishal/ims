import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DocTypeService } from 'src/app/services/doc-type.service';
import { EmployeeDocumentService } from 'src/app/services/employee-document.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';
import { IDocType, IEmployee } from 'src/app/shared/ts';

@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrls: ['./upload-doc.component.scss']
})
export class UploadDocComponent implements OnInit {
  DocumentTypeList: IDocType[]
  EmployeeList: any[]
  EmpDocId: number 
  UploadDocForm: FormGroup
  selectedFiles: any
  submitted: boolean = false
  constructor(
    public docTypeService: DocTypeService,
    public empDocTypeService: EmployeeDocumentService,
    public empService: EmployeeService,
    public activeRouter: ActivatedRoute,
    public fb: FormBuilder,
    public utilityService: UtilityService,
    public toast: ToastrManager,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.getDocumentTypes();
    this.getEmployee();
    this.activeRouter.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.EmpDocId = params['id'];
    });
    this.UploadDocForm = this.fb.group({
      EmpId: ['', Validators.required],
      DocTypeId: ['', Validators.required],
      RegistrationDate: [''],
      ExpiryDate: [''],
      // DocumentFile: [''],
      DocumentPath: [''],
      Remark: ['']
    });
    if(this.EmpDocId) this.getEmpDocDetails(this.EmpDocId);
  }

  get myForm(): {[key: string]: AbstractControl}{
    return this.UploadDocForm.controls;
  }

  getEmployee() {
    this.empService.getAllEmployee().subscribe((res: any) => {
      this.EmployeeList = res;
    })
  }

  getEmpDocDetails(EmpDocId: number) {
    this.empDocTypeService.find(EmpDocId).subscribe((res) => {
      // if()
      const empDocDetails = res[0];
      this.UploadDocForm.patchValue(empDocDetails);
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  getDocumentTypes() {
    this.docTypeService.find(0).subscribe((res) => {
       this.DocumentTypeList = res['data'];
    })
  }

  save(): void {
    this.submitted = true;
    if(this.UploadDocForm.invalid) return;
    
    let formData = new FormData();
    formData.append('EmpId', this.UploadDocForm.value['EmpId']);
    formData.append('DocTypeId', this.UploadDocForm.value['DocTypeId']);
    formData.append('RegistrationDate', this.UploadDocForm.value['RegistrationDate']);
    formData.append('ExpiryDate', this.UploadDocForm.value['ExpiryDate']);
    formData.append('DocumentPath', this.UploadDocForm.value['DocumentPath']);
    formData.append('Remark', this.UploadDocForm.value['Remark']);
    console.log(this.EmpDocId);
    if(this.EmpDocId) {
      formData.append('EmpDocId', this.UploadDocForm.value['EmpDocId']);
      this.empDocTypeService.updateEmployeeDocument(formData).subscribe((res) => {
        this.router.navigate(["dashboard/employee/doc-list/"]);
        this.toast.successToastr(res['message']);
      }, (err) => {
        this.toast.errorToastr(err);
      })
      return;
    }
    
    this.empDocTypeService.addEmployeeDocument(formData).subscribe((res) => {
      this.router.navigate(["dashboard/employee/doc-list/"]);
      this.toast.successToastr(res['message']);
    }, (err) => {
      this.toast.errorToastr(err);
    });

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    if(!this.selectedFiles) return
    let formData = new FormData();
    formData.append('DocumentFile',  this.selectedFiles[0]);
    this.utilityService.imageUpload(formData).subscribe((res) => {
      this.UploadDocForm.patchValue({
        DocumentPath: res
      });
    }, (err) => {
      console.log(err);
    })
  }

}
