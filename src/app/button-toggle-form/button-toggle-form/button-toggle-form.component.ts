import { Component, OnInit, AfterViewInit, ViewChild, forwardRef, Input } from '@angular/core';
import { MyValidators } from '../../service/myValidators';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-button-toggle-form',
  templateUrl: './button-toggle-form.component.html',
  styleUrls: ['./button-toggle-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonToggleFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ButtonToggleFormComponent),
      multi: true
    }
  ]
})
export class ButtonToggleFormComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() items;
  @Input() showName;
  valueNumber: FormControl;
  valueChange;
  setUnit;
  

  constructor(private myValidators:MyValidators) {
 this.valueNumber = new FormControl('valueNumber', [this.myValidators.quantity]);
  }

  ngOnInit() {
  }
  ngAfterViewInit() {

  }
  test(ev){
    console.log(ev);
    console.log(this.valueNumber.value);
    this.valueChange(this.valueNumber + this.setUnit);
  }
  onChange(data) {
    
      this.setUnit = data.value;
      console.log(this.setUnit);
      this.valueChange(this.valueNumber.value + this.setUnit);
      console.log(this.valueNumber + this.setUnit);
    

  }
  writeValue(obj: any) {
    this.setUnit = obj.match(/[a-z|A-Z]+$/gi)[0];
    this.valueNumber.setValue(obj.match(/^\d+/gi)[0]);
    console.log(this.setUnit);
    console.log(obj.match(/^\d+/gi));
  }
  registerOnChange(fn: any) {
    this.valueChange = fn;
  }
  registerOnTouched(fn: any) {

  }
  validate(fc: FormControl): ValidationErrors {
    const reg = /^(0|[1-9][0-9]*)$/;
    return this.setUnit && reg.test(this.valueNumber.value) ? null : {
      message: '请填写数字、选择单位'
    };
  }
}
