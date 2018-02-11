import { Component, OnInit, Input, ViewChild,EventEmitter, Output } from '@angular/core';
import { CropperSettings,ImageCropperComponent } from 'ng2-img-cropper';
@Component({
  selector: 'app-imgupload',
  templateUrl: './imgupload.component.html',
  styleUrls: ['./imgupload.component.scss']
})
export class ImguploadComponent implements OnInit {
  cropperSettings = new CropperSettings();
  open:boolean = false;
  @Input()
  set width(width){
    this.cropperSettings.width = width;
  }
  @Input()
  set height(height){
    this.cropperSettings.height = height;
  }
  @Input()
  set croppedWidth(croppedWidth){
    this.cropperSettings.croppedWidth = croppedWidth;
  }
  @Input()
  set croppedHeight(croppedHeight){
    this.cropperSettings.croppedHeight = croppedHeight;
  }
  @Input()
  set canvasWidth(canvasWidth){
    this.cropperSettings.canvasWidth = canvasWidth;
  }
  @Input()
  set canvasHeight(canvasHeight){
    this.cropperSettings.canvasHeight = canvasHeight;
  }
@Output()
imgSrc = new EventEmitter<any>();
  data:any;

 @ViewChild('cropper', undefined)
 cropper:ImageCropperComponent;

 constructor() {
     this.cropperSettings = new CropperSettings();
     this.cropperSettings.noFileInput = true;
     this.data = {};
 }

 fileChangeListener($event) {
     var image:any = new Image();
     var file:File = $event.target.files[0];
     var myReader:FileReader = new FileReader();
     var that = this;
     myReader.onloadend = function (loadEvent:any) {
         image.src = loadEvent.target.result;
         that.cropper.setImage(image);

     };

     myReader.readAsDataURL(file);

     this.open = true;
 }

  ngOnInit() {

  }
  sendImg(){
    this.imgSrc.emit(this.data.image);
  }
  cropperSetting() {
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 50;
    this.cropperSettings.croppedHeight = 50;
    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 200;
    this.data = {};
  }
}
