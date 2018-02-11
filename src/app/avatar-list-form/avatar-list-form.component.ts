import { Component, OnInit, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, FormControl} from '@angular/forms';
import { CropperSettings } from 'ng2-img-cropper';
@Component({
  selector: 'app-avatar-list-form',
  templateUrl: './avatar-list-form.component.html',
  styleUrls: ['./avatar-list-form.component.scss'],
  providers:[
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=>AvatarListFormComponent),
    multi:true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(()=>AvatarListFormComponent),
    multi:true
  }
]
})
export class AvatarListFormComponent implements OnInit, ControlValueAccessor {

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
  valueChangefn:any;
  constructor() { }

  ngOnInit() {

    this.selected = this.urls[Math.floor(Math.random() * this.urls.length)];

  }
  select(url) {
    this.selected = url;
    this.valueChangefn(this.selected);
  }
  open(){
    this.zidingyi = this.zidingyi === false? true: false;
  }
  getCropImg(url){
    this.selected = url;
    console.log(url);
    this.valueChangefn(this.selected);
  }
  writeValue(obj: any): void{
    this.selected = obj;
  }
  registerOnChange(fn: any): void{
    this.valueChangefn = fn;
  }
  registerOnTouched(fn: any): void{

  }
  validate(fc:FormControl):ValidationErrors{
    return this.selected? null: {
      message:"you must select avatar"
    }
  }

}
