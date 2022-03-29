import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ApplicationPagesService } from 'src/app/services/application-pages.service';
import { MenuService } from 'src/app/services/menu.service';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  ApplicationPageForm: FormGroup;
  submitted = false;
  pageId: number;
  menuList = [];
  constructor(
    public fb: FormBuilder,
    public _router: Router,
    public activeRoute: ActivatedRoute,
    public toast: ToastrManager,
    public applicationPagesService: ApplicationPagesService,
    public menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllMenu();
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.pageId = params['id'];
    });
    this.getPageApplicationDetails(this.pageId);
  }
  createForm() {
    this.ApplicationPageForm = this.fb.group({
      pageTitle: ['', Validators.required],
      pageURL: ['', Validators.required],
      description: [''],
      pageType: [true, Validators.required],
      menuId: ['', Validators.required],
      status: [true, Validators.required],
    });
  }
  get myForm() { return this.ApplicationPageForm.controls; }
  getPageApplicationDetails(pageId: number) {
    console.log("inok");
    this.applicationPagesService.find(pageId).subscribe((res) => {
      const pageApplicatioDetails = res['data'][0];
      this.ApplicationPageForm.patchValue(pageApplicatioDetails);
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
  addApplicationPage() {
    this.submitted = true;
    if (this.ApplicationPageForm.invalid) {
      return;
    } else {
      if(this.pageId) {
        this.applicationPagesService.put({...this.ApplicationPageForm.value, pageId: parseInt(`${this.pageId}`), menuId: parseInt(this.ApplicationPageForm.value['menuId']), pageType: Boolean(this.ApplicationPageForm.value['pageType']), status: Boolean(this.ApplicationPageForm.get['status'])}, this.pageId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/application-pages"]);
            this.toast.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toast.warningToastr(err);
          }
        })
        return;
      }
      this.applicationPagesService.add({...this.ApplicationPageForm.value,menuId: parseInt(this.ApplicationPageForm.value['menuId']), pageType: Boolean(this.ApplicationPageForm.value['pageType']), status: Boolean(this.ApplicationPageForm.value['status'])}).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/application-pages"]);
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
