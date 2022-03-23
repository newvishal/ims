import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { ChannelService } from 'src/app/services/channel.service';
import { IChannel } from 'src/app/shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  ChannelForm: FormGroup
  submitted: boolean = false;
  channelId: number
  constructor(
    public fb: FormBuilder,
    public _router: Router,
    public activeRoute: ActivatedRoute,
    public toast: ToastrManager,
    public ChannelSrv: ChannelService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params===========>',params['id']);
      this.channelId = params['id'];
    });
    this.getChannelDetails(this.channelId);
  }
  createForm() {
    this.ChannelForm = this.fb.group({
      channelName: ['', Validators.required],
      shortCode: ['']
    })
  }

  getChannelDetails(channelId: number) {
    this.ChannelSrv.find(channelId).subscribe((res) => {
      const channelDetails = res['data'][0];
      this.ChannelForm.patchValue(channelDetails);
      console.log(res);
    }, (err) => {
      console.log(err);
    })
 }

  get myForm() { return this.ChannelForm.controls; }

  addChannel() {
    this.submitted = true;
    if (this.ChannelForm.invalid) {
      return;
    } else {
      if(this.channelId) {
        this.ChannelSrv.put({...this.ChannelForm.value, channelId: parseInt(`${this.channelId}`)} as IChannel, this.channelId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/channel/"]);
            this.toast.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toast.warningToastr(err);
          }
        })
        return;
      }
      this.ChannelSrv.add(this.ChannelForm.value).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/channel/"]);
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
