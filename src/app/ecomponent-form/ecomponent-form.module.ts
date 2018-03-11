import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomponentFormComponent } from './ecomponent-form/ecomponent-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonToggleFormModule} from '../button-toggle-form/button-toggle-form.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ButtonToggleFormModule,
    ReactiveFormsModule
  ],
  declarations: [EcomponentFormComponent],
  entryComponents: [EcomponentFormComponent ]
})
export class EcomponentFormModule { }
