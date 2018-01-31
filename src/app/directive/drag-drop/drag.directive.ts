import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { DragDropService } from './drag-drop.service';
@Directive({
  selector: '[appDrag][dragClass][dragTag]'
})
export class DragDirective {
  _isDraggable: boolean = false;
  @Input()
  dragTag: string;
  @Input('appDrag')
  set isDraggable(value){
    this._isDraggable = value;
    this.rd.setAttribute(this.el.nativeElement,'draggable', `${value}`);
  }

  get isDraggable(){
    return this._isDraggable;
  }
  @Input()
  dragClass: string;
  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService
  ) {

  }
  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event){
    ev.stopPropagation();

    if(ev.target === this.el.nativeElement){
      this.service.sendMessage(this.dragTag);
      this.rd.addClass(this.el.nativeElement, this.dragClass);
    }
  }
  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event){
    if(ev.target === this.el.nativeElement){

      this.service.clearMessage();
      this.rd.removeClass(this.el.nativeElement, this.dragClass);
    }

  }


  printTarget(ev: Event){
    console.log({
      type: 'drag',
      tar:ev.target,
      na: this.el.nativeElement
    })
  }

}
