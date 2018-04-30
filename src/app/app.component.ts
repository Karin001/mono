import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { RestapiService } from './service/restapi.service';
import { ItemFormatFactoryService } from './service/item-format-factory.service';
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
  drawerStartWidth = 170;
  drawerWidth = 170;
  constructor(
    private elementRef: ElementRef,
    private rd: Renderer2,
    public restapi: RestapiService,

  ) {
    this.tryLogin();
  }
  tryLogin() {
    this.restapi.logIn({ username: '', password: '' });
  }
  dropTest(ev: Event) {
    console.log(ev);
  }
  mouseup() {
    this.dragging = false;
  }
  dragmove($event) {
    if (this.drawerStartWidth + $event.x < 80) {
      this.drawerWidth = 80;
    } else if (this.drawerStartWidth + $event.x > 170) {
      this.drawerWidth = 170;
    } else {
      this.drawerWidth = this.drawerStartWidth + $event.x;
    }
  }
  dragEnd($event) {
    this.drawerStartWidth = this.drawerWidth;

  }
}
