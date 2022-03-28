import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MenuService } from 'src/app/services/menu.service';
import { IMenu } from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  MenuForm: FormGroup;
  submitted = false;
  menuId: number
  constructor(
    public fb: FormBuilder,
    public _router: Router,
    public activeRoute: ActivatedRoute,
    public toast: ToastrManager,
    public menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.menuId = params['id'];
    });
    this.getMenuDetails(this.menuId);
  }
  createForm() {
    this.MenuForm = this.fb.group({
      menuName: ['', Validators.required],
      redirectURL: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }
  getMenuDetails(menuId: number) {
    this.menuService.find(menuId).subscribe((res) => {
      const menuDetails = res['data'][0];
      this.MenuForm.patchValue(menuDetails);
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }
  get myForm() { return this.MenuForm.controls; }
  addMenu() {
    this.submitted = true;
    if (this.MenuForm.invalid) {
      return;
    } else {
      if(this.menuId) {
        this.menuService.put({...this.MenuForm.value, menuId: parseInt(`${this.menuId}`), isActive: Boolean(this.MenuForm.get['isActive'])} as IMenu, this.menuId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/menu/"]);
            this.toast.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toast.warningToastr(err);
          }
        })
        return;
      }
      this.menuService.add(this.MenuForm.value).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/menu/"]);
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
