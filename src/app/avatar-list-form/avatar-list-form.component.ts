import { Component, OnInit, Input } from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import { CropperSettings } from 'ng2-img-cropper';
@Component({
  selector: 'app-avatar-list-form',
  templateUrl: './avatar-list-form.component.html',
  styleUrls: ['./avatar-list-form.component.scss']
})
export class AvatarListFormComponent implements OnInit {

  @Input()
  cols: number;
  @Input()
  width: number;
  @Input()
  rowHeight: number;
  @Input()
  urls: string[];
  @Input()
  img_width: string;
  selected: string;
  zidingyi: boolean = false;
  constructor() { }

  ngOnInit() {

    this.selected = this.urls[Math.floor(Math.random() * this.urls.length)];

  }
  select(url) {
    this.selected = url;
  }
  open(){
    this.zidingyi = this.zidingyi === false? true: false;
  }
  getCropImg(url){
    this.selected = url;
    console.log(url);
  }

}
