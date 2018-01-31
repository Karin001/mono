import { Directive, Input, HostListener, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';
import { DragDropService } from './drag-drop.service';
@Directive({
  selector: '[appDrop][dropClass][dropTags]'
})
export class DropDirective {
  @Input()
  dropClass: string;
  @Input()
  dropTags: string[];
  @Output()
  dragDrop = new EventEmitter();
  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService
  ) {


    }
  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.service.getMessage().take(1).subscribe(tag => {
        if(this.dropTags.indexOf(tag) > -1) {
          this.rd.addClass(this.el.nativeElement, this.dropClass);
        }
      })

    }

  }
  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event){
    ev.preventDefault();
    ev.stopPropagation();
    //this.rd.addClass(this.el.nativeElement, this.dropClass)
    if(this.el.nativeElement === ev.target){


       }
  }
  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.rd.removeClass(this.el.nativeElement, this.dropClass);
    }

  }
  @HostListener('drop', ['$event'])
  onDrop(ev: Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.service.getMessage().take(1).subscribe(tag => {
        if(this.dropTags.indexOf(tag) > -1){
          this.dragDrop.emit({
            tag:tag,
            message: `this is ${tag} drop!`
          })
        }

      })
      this.rd.removeClass(this.el.nativeElement, this.dropClass);
    }

  }

}
