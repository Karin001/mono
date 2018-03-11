import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleFormComponent } from './button-toggle-form/button-toggle-form.component';
import { SharedModule} from '../shared/shared.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ButtonToggleFormComponent],
  exports: [ButtonToggleFormComponent]

})
export class ButtonToggleFormModule { }
