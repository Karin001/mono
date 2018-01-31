import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from './drag.directive';
import { DropDirective } from './drop.directive';
import { DragDropService} from './drag-drop.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DragDirective, DropDirective],
  providers: [DragDropService],
  exports: [DragDirective, DropDirective]
})
export class DragDropModule { }
