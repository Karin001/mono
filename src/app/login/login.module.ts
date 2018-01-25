import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { AvatarComponent } from './avatar/avatar.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [LoginComponent, ImageCropperComponent, AvatarComponent],
  exports:[LoginComponent]
})
export class LoginModule { }
