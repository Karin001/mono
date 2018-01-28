import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('dragline') dl;
  title = 'app';
  drag_axis = {
    x: true,
    y: false
  };
  draggable = true;
  dragging = false;
  drawerStartWidth = 220;
  drawerWidth = 220;
  constructor(private elementRef: ElementRef, private rd: Renderer2) {

  }

  mouseup() {
    this.dragging = false;
  }
  dragmove($event) {
    if(this.drawerStartWidth + $event.x<80){
      this.drawerWidth =80;
    } else if(this.drawerStartWidth + $event.x>220) {
      this.drawerWidth =220;
    } else{
      this.drawerWidth =this.drawerStartWidth + $event.x;
    }
  }
  dragEnd($event) {
    this.drawerStartWidth = this.drawerWidth;

  }
}
