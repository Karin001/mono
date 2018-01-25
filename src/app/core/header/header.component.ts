import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  sidbartoggle = new EventEmitter;
  title: String = 'miku元件小屋';
  usermenu_open: Boolean = true;
  constructor() { }



  ngOnInit() {
  }
  onclick() {
    this.sidbartoggle.emit();
  }
  menuToggle() {
    this.usermenu_open = this.usermenu_open ? false : true;
  }
}
