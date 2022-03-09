import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { IState } from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  StateForm: FormGroup;
  submitted = false;
  bsubject: IState;
  StateList: IState[] = [];
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    public stateService: StateService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.StateForm = this.formBuilder.group({
      stateName: ['', Validators.required],
      shortCode: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.patchLocalStorageData();
  }
  
  patchLocalStorageData() {
    this.stateService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      console.log(this.bsubject);
      this.StateForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.StateForm.controls; }

  addState() {
    this.submitted = true;
    if (this.StateForm.invalid) {
      return;
    } else {
      if(this.bsubject.stateId) {
        console.log(this.bsubject);
        this.stateService.put({...this.StateForm.value, stateId: this.bsubject.stateId} as IState, this.bsubject.stateId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/state/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.stateService.saveDetails({
              stateId: '',
              stateName: '',
              shortCode: "",
              status: false
            });
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.stateService.add(this.StateForm.value).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/state/"]);
          this.toastr.successToastr(res['message']);
        },
        error: err =>{
          console.log(err);
          this.toastr.warningToastr(err);
        }
      })
    }

  }
}
