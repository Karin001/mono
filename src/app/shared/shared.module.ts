import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '../directive/drag-drop/drag-drop.module';
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
    DragDropModule,
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
    DragDropModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
