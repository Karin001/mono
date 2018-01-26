import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  drag_axis = {
    x: true,
    y: false
  };
  dragging = false;
  drawerWidth = 250;
  constructor(private elementRef: ElementRef) {

  }
  dragPointerDown() {
    this.dragging = true;
  }
  mouseup() {
    this.dragging = false;
  }
  dragEnd($event) {
    console.log($event);
    this.drawerWidth += $event.x;
    this.dragging = false;
  }
}
