import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '../directive/drag-drop/drag-drop.module';
import { ImguploadModule } from './imgupload/imgupload.module';
import {ErrorHintModule} from '../error-hint/error-hint.module'

import {
MatButtonModule,
MatButtonToggleModule,
MatToolbarModule,
MatSidenavModule,
MatSelectModule,
MatCardModule,
MatListModule,
MatIconModule,
MatFormFieldModule,
MatInputModule,
MatMenuModule,
MatGridListModule,
MatExpansionModule,
MatAutocompleteModule,
MatStepperModule,
MatRadioModule,
MatTabsModule,
MatProgressSpinnerModule,
MatSnackBarModule,
MatChipsModule


} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatExpansionModule,
    DragDropModule,
    ImguploadModule,
    MatSelectModule,
    MatTabsModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ErrorHintModule,
  MatChipsModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatMenuModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatExpansionModule,
    DragDropModule,
    ImguploadModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ErrorHintModule,
  MatChipsModule
  ]
})
export class SharedModule { }
