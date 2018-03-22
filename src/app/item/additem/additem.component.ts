import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FieldConfig } from '../../dynamic-form/interface/fieldConfig';
import { DynamicFormComponent } from '../../dynamic-form/container/dynamic-form/dynamic-form.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MyValidators } from '../../service/myValidators';
import { Ename } from '../../ecomponent-form/eTypeDef/eTypeDef';
@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit, AfterViewInit {
  @ViewChild('dynamicForm')
  dynamicForm: DynamicFormComponent;
  newItem;
  bomTypes = Ename;
  selectedBomType = Ename[0].value;
  formsPool: { [formType: string]: FieldConfig[] } = {
    RES: [
      {
        type: 'input',
        label: '型号',
        name: 'marking',
        placeholder: '',
        disabled: false,
        validations: [this.myValidators.eng_numChar],
        error: { name: 'eng_numChar', message: '输入限定为英文和数字' }
      },
      {
        type: 'input',
        label: '阻值',
        name: 'value',
        disabled: false,
        placeholder: '',
        validations: [Validators.required, this.myValidators.num_point],
        error: { name: 'num_point', message: '输入限定为数字，最多两位小数' }
      },
      {
        type: 'radio',
        label: '阻值单位',
        name: 'unit',
        disabled: false,
        placeholder: '',
        options: ['Ω', 'kΩ', 'MΩ'],
        validations: [Validators.required],
      },
      {
        type: 'input',
        label: '封装',
        name: 'footprint',
        disabled: false,
        placeholder: '',
        validations: [Validators.required, this.myValidators.footprint],
        error: { name: 'footprint', message: '输入限定为英文和数字，或特殊符号横杠 - ' }
      },
      {
        type: 'radio',
        label: '精度',
        name: 'precise',
        disabled: false,
        placeholder: '',
        options: ['1%', '5%', '10%', '15%'],
        validations: [Validators.required]
      }, {
        type: 'input',
        label: '已采购数量',
        name: 'quantity',
        value: '0',
        disabled: false,
        placeholder: '',
        validations: [Validators.required, this.myValidators.quantity],
        error: { name: 'quantity', message: '输入限定为有意义的数字，未采购填0' }
      },

      {
        label: 'Submit',
        name: 'submit',
        type: 'button',
        disabled: false,
      }
    ],
    CAP: [
      {
        type: 'input',
        label: '型号',
        name: 'marking',
        placeholder: '',
        disabled: false,
        validations: [this.myValidators.eng_numChar],
        error: { name: 'eng_numChar', message: '输入限定为英文和数字' }
      },
      {
        type: 'input',
        label: '容值',
        name: 'value',
        disabled: false,
        placeholder: '',
        validations: [Validators.required, this.myValidators.num_point],
        error: { name: 'num_point', message: '输入限定为数字，最多两位小数' }
      },
      {
        type: 'radio',
        label: '容值单位',
        name: 'unit',
        disabled: false,
        placeholder: '',
        options: ['pf', 'nf', 'uf', 'mf', 'f'],
        validations: [Validators.required],
      },
      {
        type: 'input',
        label: '耐压值（单位 V）',
        name: 'volt',
        disabled: false,
        placeholder: '',
        validations: [Validators.required, this.myValidators.volt],
        error: { name: 'volt', message: '输入限定为三位以下数字' }
      },
      {
        type: 'input',
        label: '封装',
        name: 'footprint',
        disabled: false,
        placeholder: '',
        validations: [Validators.required, this.myValidators.footprint],
        error: { name: 'footprint', message: '输入限定为英文和数字，或特殊符号横杠 - ' }
      },
      {
        type: 'input',
        label: '已采购数量',
        name: 'quantity',
        value: '0',
        disabled: false,
        placeholder: '',
        validations: [Validators.required, this.myValidators.quantity],
        error: { name: 'quantity', message: '输入限定为有意义的数字，未采购填0' }
      },
      {
        label: 'Submit',
        name: 'submit',
        type: 'button',
        disabled: false,
      }
    ],
    movie: [
      {
        type: 'input',
        label: '感兴趣的电影',
        name: 'movieName',
        placeholder: '请输入',
        disabled: false,
        validations: [Validators.required]
      },
      {
        label: '喜欢的等级',
        name: 'like',
        options: ['喜欢', '非常喜欢', '特别喜欢', '超级喜欢'],
        type: 'radio',
        disabled: false,
      },
      {
        label: 'Submit',
        name: 'submit',
        type: 'button',
        disabled: false,
      }
    ]
  };

  formFieldConfigs;
  select;
  constructor(
    public dialogRef: MatDialogRef<AdditemComponent>,
    private myValidators: MyValidators
  ) {

  }

  ngOnInit() {
    this.formFieldConfigs = this.formsPool.RES;
  }
  ngAfterViewInit() {
    let previousValid = this.dynamicForm.valid;
    this.dynamicForm.changes
      .subscribe(val => {
        if (previousValid !== this.dynamicForm.valid) {
          previousValid = this.dynamicForm.valid;
          this.dynamicForm.setDisabled('submit', !previousValid);
        }
      });
    setTimeout(() => {
      this.dynamicForm.setDisabled('submit', true);
    });

  }
  onSubmit(ev) {
    console.log(ev);
  }
  changeForm(formType) {
    this.formFieldConfigs = this.formsPool[formType];
    setTimeout(() => {
      this.dynamicForm.setDisabled('submit', true);
    });
  }
  createSelForm() {

  }
}
