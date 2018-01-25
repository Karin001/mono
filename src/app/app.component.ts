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
  }
  drawerWidth = 450;
  constructor(private elementRef: ElementRef) {

  }
  dragEnd($event){
    console.log($event);
    this.drawerWidth += $event.x;
  }
}
