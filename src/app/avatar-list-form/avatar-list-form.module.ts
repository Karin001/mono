import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarListFormComponent } from './avatar-list-form.component';

import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
 
  ],
  declarations: [AvatarListFormComponent],
  exports: [AvatarListFormComponent]
})
export class AvatarListFormModule { }
