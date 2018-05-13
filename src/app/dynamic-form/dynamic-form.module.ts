import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { DynamicFormComponent } from './container/dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { CheckboxValuePosterService } from './service/checkbox-value-poster.service';
import { MatProgressBarModule } from '@angular/material';
import { FormAutoInputComponent } from './components/form-auto-input/form-auto-input.component';
@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  declarations: [
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
    DynamicFormComponent,
    DynamicFieldDirective,
    FormRadioComponent,
    FormCheckboxComponent,
    FormAutoInputComponent
  ],
  exports: [
    DynamicFormComponent,
  ],
  entryComponents: [
    FormInputComponent,
    FormAutoInputComponent,
    FormSelectComponent,
    FormButtonComponent,
    FormCheckboxComponent,
    FormRadioComponent
  ],
  providers: [CheckboxValuePosterService]
})
export class DynamicFormModule { }
