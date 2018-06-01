import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interface/fieldConfig';
import { RestapiService } from '../../../service/restapi.service';
import 'rxjs/add/operator/debounceTime';
@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit,AfterViewInit {
  group: FormGroup;
  config: FieldConfig;
  progressBarSet = false;
  duplicate = false;
  constructor(
    public restapi: RestapiService
  ) {

  }

  ngOnInit() {
  

  }
  ngAfterViewInit() {
    this.group.controls[this.config.name].valueChanges
    .filter(v=>!!v)
    .subscribe(v => {
      console.log(v);
      if (v !== v.toUpperCase()) {
        this.group.controls[this.config.name].setValue(v.toUpperCase());
      }

    })
  }


}
