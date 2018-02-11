import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import {AvatarListFormModule} from '../avatar-list-form/avatar-list-form.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AvatarListFormModule


  ],
  declarations: [LoginComponent, SignupComponent],
  exports:[LoginComponent]
})
export class LoginModule { }
