import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { ImguploadComponent } from './imgupload/imgupload.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [ImageCropperComponent, ImguploadComponent],
  exports: [ImguploadComponent]
})
export class ImguploadModule { }
