import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PageAccessService } from 'src/app/services/page-access.service';
import { MenuService } from 'src/app/services/menu.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ApplicationPagesService } from 'src/app/services/application-pages.service';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  PageAccessForm: FormGroup;
  submitted = false;
  pageAccessId: number;
  menuList = [];
  empList = [];
  applicationPagesList = [];
  constructor(
    public fb: FormBuilder,
    public _router: Router,
    public activeRoute: ActivatedRoute,
    public toast: ToastrManager,
    public applicationPagesService: ApplicationPagesService,
    public menuService: MenuService,
    public employeeService: EmployeeService,
    public pageAccessService:PageAccessService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllMenu();
    this.getAllApplicationPages();
    this.getAllEmp();
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.pageAccessId = params['id'];
    });
    this.getPageAccessDetails(this.pageAccessId);
  }

  createForm() {
    this.PageAccessForm = this.fb.group({
      pageId: ['', Validators.required],
      menuId: ['', Validators.required],
      empId: ['', Validators.required],
      roleId: ['', Validators.required],
      status: [true, Validators.required],
    });
  }
  get myForm() { return this.PageAccessForm.controls; }
  getPageAccessDetails(pageAccessId: number) {
    console.log("inok");
    this.pageAccessService.find(pageAccessId).subscribe((res) => {
      const pageAccessDetails = res['data'][0];
      this.PageAccessForm.patchValue(pageAccessDetails);
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  getAllMenu(){
    this.menuService.find(0).subscribe((res)=>{
      this.menuList = res['data']
    },(err)=>{});
  }

  getAllEmp(){
    this.employeeService.getAllEmployee().subscribe((res)=>{
      this.empList = Object.assign([],res);
    },(err)=>{});
  }

  getAllApplicationPages(){
    this.applicationPagesService.find(0).subscribe((res)=>{
      this.applicationPagesList = res['data']
    },(err)=>{});
  }

  addPageAccess() {
    this.submitted = true;
    if (this.PageAccessForm.invalid) {
      return;
    } else {
      if(this.pageAccessId) {
        this.pageAccessService.put({...this.PageAccessForm.value,userId:0, pageAccessId: parseInt(`${this.pageAccessId}`), menuId: parseInt(this.PageAccessForm.value['menuId']),pageId: parseInt(this.PageAccessForm.value['pageId']), empId: parseInt(this.PageAccessForm.value['empId']),roleId: parseInt(this.PageAccessForm.value['roleId']), status: Boolean(this.PageAccessForm.get['status'])}, this.pageAccessId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/page-access"]);
            this.toast.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toast.warningToastr(err);
          }
        })
        return;
      }
      this.pageAccessService.add({...this.PageAccessForm.value,userId:0, menuId: parseInt(this.PageAccessForm.value['menuId']),empId: parseInt(this.PageAccessForm.value['empId']),pageId: parseInt(this.PageAccessForm.value['pageId']), roleId: parseInt(this.PageAccessForm.value['roleId']),status: Boolean(this.PageAccessForm.value['status'])}).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/page-access"]);
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
