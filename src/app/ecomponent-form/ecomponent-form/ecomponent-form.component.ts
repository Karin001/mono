import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoComplateService } from '../../service/auto-complate.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Ename, Etype, Runit, Wunit, Footprint } from '../eTypeDef/eTypeDef';
import { MyValidators } from '../../service/myValidators';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-ecomponent-form',
  templateUrl: './ecomponent-form.component.html',
  styleUrls: ['./ecomponent-form.component.scss']
})
export class EcomponentFormComponent implements OnInit {
  fgSign: FormGroup;
  fgParam: FormGroup;
  fgQuantity: FormGroup;
  Runits = Runit;
  Wunits = Wunit;
  names = Ename;
  footprints = Footprint;
  name;
  marking;
  quantity;
  value;
  vunit;
  power;
  wunit;
  footprint;
  footprint$: Observable<string[]>;
  constructor(
    private fb: FormBuilder,
    private auto: AutoComplateService,
    public dialogRef: MatDialogRef<EcomponentFormComponent>,
    private myValidators: MyValidators
  ) {
    this.createForm();

  }

  ngOnInit() {
  }
  createForm() {
    this.fgSign = this.fb.group({
      name: ['RES'],
      marking: ['', [this.myValidators.eng_numChar]],
    })
    this.fgParam = this.fb.group({
      value: ['5R'],

      power: ['2W'],

      footprint: ['', [this.myValidators.footprint]]
    })


    this.fgQuantity = this.fb.group({
      quantity: [0, [this.myValidators.quantity]],
    })

    this.name = this.fgSign.get('name');
    this.marking = this.fgSign.get('marking');
    this.quantity = this.fgQuantity.get('quantity');
    this.footprint = this.fgParam.get('footprint');
    this.value = this.fgParam.get('value');
    this.vunit = this.fgParam.get('vunit');
    this.power = this.fgParam.get('power');
    this.wunit = this.fgParam.get('wunit');
    this.footprint$ = this.auto.autoComlate(this.footprint, this.footprints);
  }
  test() {
    console.log(this.fgParam);
  }
  onSelectionChange(ev){
    if(ev.previouslySelectedIndex === 0){
      
    }
    
  }
  onSubmit() {
    if (this.fgParam.valid) {
      const value = this.value.value + this.vunit.value;
      const power = this.power.value + this.wunit.value;
      const date = new Date();
      const eComponent = new Etype(
        this.name.value,
        this.marking.value,
        this.footprint.value,
        value,
        power,
        this.quantity.value,
        date
      );
      console.log(eComponent);
    } else {
      return;
    }
  }

}
