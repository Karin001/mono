import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '../directive/drag-drop/drag-drop.module';
import { ImguploadModule } from './imgupload/imgupload.module';
import {ErrorHintModule} from '../error-hint/error-hint.module'

import {
MatButtonModule,
MatToolbarModule,
MatSidenavModule,
MatCardModule,
MatListModule,
MatIconModule,
MatFormFieldModule,
MatInputModule,
MatMenuModule,
MatGridListModule,
MatExpansionModule,
MatAutocompleteModule


} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
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
    BrowserAnimationsModule,
  ErrorHintModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    MatButtonModule,
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
    BrowserAnimationsModule,
  ErrorHintModule
  ]
})
export class SharedModule { }
