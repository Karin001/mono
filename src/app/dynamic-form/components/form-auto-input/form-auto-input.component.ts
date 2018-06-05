import { Component, OnInit, AfterViewInit,ViewEncapsulation  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FieldConfig } from '../../interface/fieldConfig';
import { RestapiService } from '../../../service/restapi.service';
import { ItemModifyService } from '../../../service/item-modify.service';
import { AutoComplateService } from '../../../service/auto-complate.service';
@Component({
  selector: 'app-form-auto-input',
  templateUrl: './form-auto-input.component.html',
  styleUrls: ['./form-auto-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormAutoInputComponent implements OnInit, AfterViewInit{

  group: FormGroup;
  config: FieldConfig;
  options = [];
  showOptions = [];
  filteredOptions;
  progressBarSet = false;
  duplicate = false;
  get controll(){
    return this.group.controls[this.config.name];
  }
  constructor(
    private auto: AutoComplateService,
    private restapi: RestapiService,
    private itemModify: ItemModifyService
  ) {
  }

  ngOnInit() {
    // this.group.controls[this.config.name].valueChanges.subscribe(v => {
    //   console.log(v);
    //   if (v !== v.toUpperCase()) {
    //     this.group.controls[this.config.name].setValue(v.toUpperCase());
    //   }

    // })
    this.itemModify.getItemUpdate().filter(v => v === 'complate').subscribe(v => {

                  this.options = this.restapi.localItemList.items.filter(item => item[this.config.name])
                  .map(item => item[this.config.name]);
                  this.options = Array.from(new Set(this.options));
                  console.log('options', this.options);
                  if (this.filteredOptions) {
                    this.filteredOptions.unsubscribe();
                  }

                  this.filteredOptions = this.auto.autoComlate(this.group.controls[this.config.name] as FormControl, this.options)
                    .subscribe(val => this.showOptions = val);
                });

  }
  onBlur() {
    if(this.controll.value){
      this.controll.setValue(this.controll.value.toUpperCase());
    }
  }
  ngAfterViewInit() {

  }
}
