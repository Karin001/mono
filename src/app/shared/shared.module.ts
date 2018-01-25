import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

    BrowserAnimationsModule
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
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
