import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }
