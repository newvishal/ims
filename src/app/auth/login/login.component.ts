import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private _auth: AuthService,private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  get myForm() { return this.loginForm.controls; }

  loginUser() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      var checkToken = localStorage.getItem('token');
      if(checkToken){
        localStorage.removeItem('token');
      }
      let loginObj = {
        userId : this.loginForm.get("userName").value,
        password : this.loginForm.get("password").value,
        mobDeviceId: "DFDS23423",
        deviceType: "M",
        roleId: 0
      }
      console.log(loginObj);

      this._auth.authenticateUser(loginObj).subscribe({
        next: res =>{
          console.log(res);
          localStorage.setItem('token', res['token']);
         
          this._router.navigate(['/dashboard']);
          this.toastr.successToastr(res['message']);
        },
        error: err =>{
          console.log(err);
          // console.log(typeof err);
          this.toastr.warningToastr(err);
          // if (err.status === 401) {
          //   this.toastr.warningToastr(err.message);
          // } else {
          //   this.toastr.warningToastr('Somthing went wrong!!!');
          // }
        }
      })
    }

  }

}
