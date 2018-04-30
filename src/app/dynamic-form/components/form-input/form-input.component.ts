import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interface/fieldConfig';
import { RestapiService } from '../../../service/restapi.service';
import 'rxjs/add/operator/debounceTime';
@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
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


}
