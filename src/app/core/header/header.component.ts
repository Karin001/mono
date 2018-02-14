import { Component, OnInit, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { Event } from '@angular/router/src/events';
import { searchMove } from '../../anims/anim';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [searchMove]
})
export class HeaderComponent implements OnInit {
  @Output()
  sidbartoggle = new EventEmitter;
  title: String = 'miku元件小屋';
  usermenu_open: Boolean = true;
  state = 'out';
  options = [
    '2',
    '3'
  ];


  ngOnInit() {
  }
  onclick() {
    this.sidbartoggle.emit();
  }
  menuToggle() {
    this.usermenu_open = this.usermenu_open ? false : true;
  }
  onFocus() {
    this.state = 'in';
    console.log(1);
  }
  onBlur() {
    this.state = 'out';
  }
}
