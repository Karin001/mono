import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FieldConfig } from '../../dynamic-form/interface/fieldConfig';
import { DynamicFormComponent } from '../../dynamic-form/container/dynamic-form/dynamic-form.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MyValidators } from '../../service/myValidators';
import { Ename } from '../../ecomponent-form/eTypeDef/eTypeDef';
import { RestapiService } from '../../service/restapi.service';
import { ItemModifyService } from '../../service/item-modify.service';
import { SnackBarService } from '../../service/snack-bar.service';
import { ItemFormatFactoryService } from '../../service/item-format-factory.service';
interface FormsVal {
  name?: string;
  usevalue?: string;
  usevolt?: string;
  childType: String;
  footprint: String;
  marking: String;
  customtag?: string;
  quantity: Number;
  unit?: String;
  value?: String;
  precise?: String;
  volt?: Number;
  description?: String;
}
interface FormsData {
  checkboxVal: string[];
  formVal: FormsVal;
  valid: Boolean;
}
@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit, AfterViewInit {
  @ViewChild('dynamicForm')
  dynamicForm: DynamicFormComponent;
  newItem;
  FOOTPRINT = {
    type: 'input',
    label: '封装',
    name: 'footprint',
    disabled: false,
    placeholder: '',
    validations: [Validators.required, this.myValidators.footprint, Validators.maxLength(30)],
    error: { name: 'footprint', message: '输入限定为英文和数字，或特殊符号横杠-,最多30个字符 ' }
  };
  bomTypes;
  selectedBomType = Ename[0].value;
  formsPool: { [formType: string]: FieldConfig[] };
  // = {
  //   RES: [
  //     {
  //       type: 'input',
  //       label: '型号',
  //       name: 'marking',
  //       placeholder: '',
  //       disabled: false,
  //       validations: [this.myValidators.eng_numChar, Validators.maxLength(30), this.myValidators.dupilicateMarkingFn()],
  //       error: { name: 'eng_numChar,maxlength', message: '输入限定为英文和数字,最多30个字符' }
  //     },
  //     {
  //       type: 'select',
  //       label: '电阻类型',
  //       name: 'childType',
  //       disabled: false,
  //       placeholder: '使用自定义标签作为新的子类',
  //       options: ['普通', '可变', '光敏', '压敏', '热敏'],
  //       validations: [Validators.required],
  //     },
  //     {
  //       type: 'input',
  //       label: '阻值',
  //       name: 'value',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.num_point, Validators.maxLength(10)],
  //       error: { name: 'num_point,maxlength', message: '输入限定为10位以下数字，最多两位小数' }
  //     },
  //     {
  //       type: 'radio',
  //       label: '阻值单位',
  //       name: 'unit',
  //       disabled: false,
  //       placeholder: '',
  //       options: ['Ω', 'kΩ', 'MΩ'],
  //       validations: [Validators.required],
  //     },
  //     {
  //       type: 'input',
  //       label: '封装',
  //       name: 'footprint',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.footprint, Validators.maxLength(30)],
  //       error: { name: 'footprint,maxlength', message: '输入限定为英文和数字，或特殊符号横杠-,最多30个字符 ' }
  //     },
  //     {
  //       type: 'radio',
  //       label: '精度',
  //       name: 'precise',
  //       disabled: false,
  //       placeholder: '',
  //       options: ['1%', '5%', '10%', '15%'],
  //       validations: [Validators.required]
  //     }, {
  //       type: 'input',
  //       label: '已采购数量',
  //       name: 'quantity',
  //       value: '0',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.quantity],
  //       error: { name: 'quantity', message: '输入限定为有意义的数字，未采购填0' }
  //     },

  //     {
  //       label: 'Submit',
  //       name: 'submit',
  //       type: 'button',
  //       disabled: false,
  //     }
  //   ],
  //   CAP: [
  //     {
  //       type: 'input',
  //       label: '型号',
  //       name: 'marking',
  //       placeholder: '',
  //       disabled: false,
  //       validations: [this.myValidators.eng_numChar, Validators.maxLength(30)],
  //       error: { name: 'eng_numChar,maxlength', message: '输入限定为英文和数字,最多30个字符' }
  //     },
  //     {
  //       type: 'radio',
  //       label: '电容类型',
  //       name: 'childType',
  //       disabled: false,
  //       placeholder: '',
  //       options: ['电解', '陶瓷', '纸介', '云母', '薄膜'],
  //       validations: [Validators.required],
  //     },
  //     {
  //       type: 'input',
  //       label: '容值',
  //       name: 'value',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.num_point, Validators.maxLength(10)],
  //       error: { name: 'num_point,maxlength', message: '输入限定为10位以下数字，最多两位小数' }
  //     },
  //     {
  //       type: 'radio',
  //       label: '容值单位',
  //       name: 'unit',
  //       disabled: false,
  //       placeholder: '',
  //       options: ['pF', 'nF', 'uF', 'mF', 'F'],
  //       validations: [Validators.required],
  //     },
  //     {
  //       type: 'input',
  //       label: '耐压值（单位 V）',
  //       name: 'volt',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.volt],
  //       error: { name: 'volt', message: '输入限定为三位以下数字' }
  //     },
  //     {
  //       type: 'input',
  //       label: '封装',
  //       name: 'footprint',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.footprint, Validators.maxLength(30)],
  //       error: { name: 'footprint,maxlength', message: '输入限定为英文和数字，或特殊符号横杠-,最多30个字符 ' }
  //     },
  //     {
  //       type: 'input',
  //       label: '已采购数量',
  //       name: 'quantity',
  //       value: '0',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.quantity],
  //       error: { name: 'quantity', message: '输入限定为有意义的数字，未采购填0' }
  //     },
  //     {
  //       label: 'Submit',
  //       name: 'submit',
  //       type: 'button',
  //       disabled: false,
  //     }
  //   ],
  //   DIODE: [
  //     {
  //       type: 'input',
  //       label: '型号',
  //       name: 'marking',
  //       placeholder: '',
  //       disabled: false,
  //       validations: [this.myValidators.eng_numChar, Validators.maxLength(30)],
  //       error: { name: 'eng_numChar,maxlength', message: '输入限定为英文和数字,最多30个字符' }
  //     },
  //     {
  //       type: 'radio',
  //       label: '二极管类型',
  //       name: 'childType',
  //       disabled: false,
  //       placeholder: '',
  //       options: ['肖特基', '整流', '稳压', '变容', '普通', '发光'],
  //       validations: [Validators.required],
  //     },
  //     {
  //       type: 'input',
  //       label: '封装',
  //       name: 'footprint',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.footprint, Validators.maxLength(30)],
  //       error: { name: 'footprint,maxlength', message: '输入限定为英文和数字，或特殊符号横杠-,最多30个字符 ' }
  //     },
  //     {
  //       type: 'input',
  //       label: '已采购数量',
  //       name: 'quantity',
  //       value: '0',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.quantity],
  //       error: { name: 'quantity', message: '输入限定为有意义的数字，未采购填0' }
  //     },
  //     {
  //       label: 'Submit',
  //       name: 'submit',
  //       type: 'button',
  //       disabled: false,
  //     }
  //   ],
  //   INDUCTOR: [
  //     {
  //       type: 'input',
  //       label: '型号',
  //       name: 'marking',
  //       placeholder: '',
  //       disabled: false,
  //       validations: [this.myValidators.eng_numChar, Validators.maxLength(30)],
  //       error: { name: 'eng_numChar,maxlength', message: '输入限定为英文和数字,最多30个字符' }
  //     },
  //     {
  //       type: 'input',
  //       label: '电感值',
  //       name: 'value',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.num_point, Validators.maxLength(10)],
  //       error: { name: 'num_point,maxlength', message: '输入限定10位以下数字，最多两位小数' }
  //     },
  //     {
  //       type: 'radio',
  //       label: '电感值单位',
  //       name: 'unit',
  //       disabled: false,
  //       placeholder: '',
  //       options: ['nH', 'uH', 'mH', 'H'],
  //       validations: [Validators.required],
  //     },
  //     {
  //       type: 'input',
  //       label: '封装',
  //       name: 'footprint',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.footprint, Validators.maxLength(30)],
  //       error: { name: 'footprint,maxlength', message: '输入限定为英文和数字，或特殊符号横杠-,最多30个字符 ' }
  //     },
  //     {
  //       type: 'input',
  //       label: '已采购数量',
  //       name: 'quantity',
  //       value: '0',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.quantity],
  //       error: { name: 'quantity', message: '输入限定为有意义的数字，未采购填0' }
  //     },
  //     {
  //       label: 'Submit',
  //       name: 'submit',
  //       type: 'button',
  //       disabled: false,
  //     }
  //   ],
  //   TRIODE: [
  //     {
  //       type: 'input',
  //       label: '型号',
  //       name: 'marking',
  //       placeholder: '',
  //       disabled: false,
  //       validations: [this.myValidators.eng_numChar, Validators.maxLength(30)],
  //       error: { name: 'eng_numChar,maxlength', message: '输入限定为英文和数字,最多30个字符' }
  //     },
  //     {
  //       type: 'radio',
  //       label: '三极管类型',
  //       name: 'childType',
  //       disabled: false,
  //       placeholder: '',
  //       options: ['NPN', 'PNP'],
  //       validations: [Validators.required],
  //     },
  //     {
  //       type: 'input',
  //       label: '封装',
  //       name: 'footprint',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.footprint, Validators.maxLength(30)],
  //       error: { name: 'footprint,maxlength', message: '输入限定为英文和数字，或特殊符号横杠-,最多30个字符 ' }
  //     },
  //     {
  //       type: 'input',
  //       label: '已采购数量',
  //       name: 'quantity',
  //       value: '0',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.quantity],
  //       error: { name: 'quantity', message: '输入限定为有意义的数字，未采购填0' }
  //     },
  //     {
  //       label: 'Submit',
  //       name: 'submit',
  //       type: 'button',
  //       disabled: false,
  //     }
  //   ],
  //   MOS: [
  //     {
  //       type: 'input',
  //       label: '型号',
  //       name: 'marking',
  //       placeholder: '',
  //       disabled: false,
  //       validations: [this.myValidators.eng_numChar, Validators.maxLength(30)],
  //       error: { name: 'eng_numChar,maxlength', message: '输入限定为英文和数字,最多30个字符' }
  //     },
  //     {
  //       type: 'input',
  //       label: '封装',
  //       name: 'footprint',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.footprint, Validators.maxLength(30)],
  //       error: { name: 'footprint,maxlength', message: '输入限定为英文和数字，或特殊符号横杠-,最多30个字符 ' }
  //     },
  //     {
  //       type: 'input',
  //       label: '已采购数量',
  //       name: 'quantity',
  //       value: '0',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.quantity],
  //       error: { name: 'quantity', message: '输入限定为有意义的数字，未采购填0' }
  //     },
  //     {
  //       label: 'Submit',
  //       name: 'submit',
  //       type: 'button',
  //       disabled: false,
  //     }
  //   ],
  //   'MCU|IC|DSP|FPGA': [
  //     {
  //       type: 'input',
  //       label: '型号',
  //       name: 'marking',
  //       placeholder: '',
  //       disabled: false,
  //       validations: [this.myValidators.eng_numChar, Validators.maxLength(30)],
  //       error: { name: 'eng_numChar,maxlength', message: '输入限定为英文和数字,最多30个字符' }
  //     },
  //     {
  //       type: 'input',
  //       label: '封装',
  //       name: 'footprint',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.footprint, Validators.maxLength(30)],
  //       error: { name: 'footprint,maxlength', message: '输入限定为英文和数字，或特殊符号横杠-,最多30个字符 ' }
  //     },
  //     {
  //       type: 'input',
  //       label: '自定义标签',
  //       name: 'tag',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, Validators.maxLength(20)],
  //       error: { name: 'maxlength', message: '输入限定为20个以下字符' }
  //     },
  //     {
  //       type: 'input',
  //       label: '已采购数量',
  //       name: 'quantity',
  //       value: '0',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.quantity],
  //       error: { name: 'quantity', message: '输入限定为有意义的数字，未采购填0' }
  //     },
  //     {
  //       label: 'Submit',
  //       name: 'submit',
  //       type: 'button',
  //       disabled: false,
  //     }
  //   ],
  //   'HOKA': [
  //     {
  //       type: 'input',
  //       label: '型号',
  //       name: 'marking',
  //       placeholder: '',
  //       disabled: false,
  //       validations: [this.myValidators.eng_numChar, Validators.maxLength(30)],
  //       error: { name: 'eng_numChar,maxlength', message: '输入限定为英文和数字,最多30个字符' }
  //     },
  //     {
  //       type: 'input',
  //       label: '值（可选填）',
  //       name: 'curValue',
  //       placeholder: '',
  //       disabled: false,
  //       validations: [Validators.maxLength(20)],
  //       error: { name: 'maxlength', message: '输入限定最多20个字符' }
  //     },
  //     {
  //       type: 'input',
  //       label: '封装',
  //       name: 'footprint',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.footprint, Validators.maxLength(30)],
  //       error: { name: 'footprint,maxlength', message: '输入限定为英文和数字，或特殊符号横杠-,最多30个字符 ' }
  //     },
  //     {
  //       type: 'input',
  //       label: '自定义标签',
  //       name: 'tag',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, Validators.maxLength(20)],
  //       error: { name: 'maxlength', message: '输入限定为20个以下字符' }
  //     },
  //     {
  //       type: 'input',
  //       label: '已采购数量',
  //       name: 'quantity',
  //       value: '0',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.quantity],
  //       error: { name: 'quantity', message: '输入限定为有意义的数字，未采购填0' }
  //     },
  //     {
  //       label: 'Submit',
  //       name: 'submit',
  //       type: 'button',
  //       disabled: false,
  //     }
  //   ],
  //   'OSCILLATOR': [
  //     {
  //       type: 'input',
  //       label: '型号',
  //       name: 'marking',
  //       placeholder: '',
  //       disabled: false,
  //       validations: [this.myValidators.eng_numChar, Validators.maxLength(30)],
  //       error: { name: 'eng_numChar,maxlength', message: '输入限定为英文和数字,最多30个字符' }
  //     },
  //     {
  //       type: 'radio',
  //       label: '晶振类型',
  //       name: 'childType',
  //       disabled: false,
  //       placeholder: '',
  //       options: ['有源', '无源'],
  //       validations: [Validators.required],
  //     },
  //     {
  //       type: 'input',
  //       label: '频率值',
  //       name: 'value',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.num_point, Validators.maxLength(10)],
  //       error: { name: 'num_point,maxlength', message: '输入限定10位以下数字，最多两位小数' }
  //     },
  //     {
  //       type: 'radio',
  //       label: '频率值单位',
  //       name: 'unit',
  //       disabled: false,
  //       placeholder: '',
  //       options: ['kHz', 'MHz'],
  //       validations: [Validators.required],
  //     },
  //     {
  //       type: 'input',
  //       label: '封装',
  //       name: 'footprint',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.footprint, Validators.maxLength(30)],
  //       error: { name: 'footprint,maxlength', message: '输入限定为英文和数字，或特殊符号横杠-,最多30个字符 ' }
  //     },
  //     {
  //       type: 'input',
  //       label: '已采购数量',
  //       name: 'quantity',
  //       value: '0',
  //       disabled: false,
  //       placeholder: '',
  //       validations: [Validators.required, this.myValidators.quantity],
  //       error: { name: 'quantity', message: '输入限定为有意义的数字，未采购填0' }
  //     },
  //     {
  //       label: 'Submit',
  //       name: 'submit',
  //       type: 'button',
  //       disabled: false,
  //     }
  //   ],
  // };

  formFieldConfigs;
  select;
  constructor(
    public dialogRef: MatDialogRef<AdditemComponent>,
    private myValidators: MyValidators,
    private restApi: RestapiService,
    private itemModify: ItemModifyService,
    private snackBar: SnackBarService,
    private itemFac: ItemFormatFactoryService,
  ) {
    this.itemFac.creatDynamicFormConfig();
    this.bomTypes = Object.keys(this.itemFac.itemTypes);
    this.formsPool = this.itemFac.itemDynamicConfigs;
  }

  ngOnInit() {

    this.formFieldConfigs = this.formsPool['RES'];

    console.log('formConfigs', this.itemFac.itemDynamicConfigs);
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
  onSubmit(ev: FormsData) {
    console.log('valid', this.dynamicForm.valid);
    this.dialogRef.close();
    if (this.dynamicForm.valid && this.selectedBomType === 'Others') {
      this.itemFac.baseSets[ev.formVal.name] = [];
      this.itemFac.baseSets[ev.formVal.name].push('marking', 'childType', 'footprint', 'quantity', 'description', 'customtag');
      if (ev.formVal.usevalue === '需要') {
        this.itemFac.baseSets[ev.formVal.name].push('value');
      }
      if (ev.formVal.usevolt === '需要') {
        this.itemFac.baseSets[ev.formVal.name].push('volt');
      }
      this.itemFac.baseSets[ev.formVal.name].push('submit');
      this.itemFac.itemTypes[ev.formVal.name] = ['无', '使用自定义子类'];
      return;
    }
    console.log(ev);
    let _quantity, marking, setUpTime, childType, footprint, description, _property: any;
    setUpTime = new Date();
    _property = [];
    for (const key in ev.formVal) {
      if (ev.formVal.hasOwnProperty(key)) {
        if (key === 'marking') {
          marking = ev.formVal.marking;
        } else if (key === 'quantity') {
          _quantity = ev.formVal.quantity;
        } else if (key === 'childType') {
          if (ev.formVal.childType !== '使用自定义子类') {
            childType = ev.formVal.childType;
          }
        } else if (key === 'customtag') {
          if (ev.formVal.childType === '使用自定义子类') {
            childType = ev.formVal.customtag;
            this.itemFac.itemTypes[this.selectedBomType].pop();
            this.itemFac.itemTypes[this.selectedBomType].push(childType);
            this.itemFac.itemTypes[this.selectedBomType].push('使用自定义子类');
          }

        } else if (key === 'footprint') {
          footprint = ev.formVal.footprint;
        } else if (key === 'description') {
          description = ev.formVal.description || '该器件未添加描述';
        } else {
          _property.push(key + ':' + ev.formVal[key]);
        }
      }
    }


    if (this.restApi.localItemList && this.restApi.localItemList['items']) {
      this.restApi.addItem({
        name: this.selectedBomType,
        quantity: _quantity,
        marking: marking,
        setUpTime: setUpTime,
        footprint: footprint,
        childType: childType,
        description: description,
        property: _property
      })
        .subscribe(res => {
          console.log(res);
          if (res.code === 'success') {
            this.snackBar.openSnackBar('sucess');
            this.itemModify.doModify();
          }
        });
    } else {
      this.restApi.addFirstItem({
        name: this.selectedBomType,
        quantity: _quantity,
        marking: marking,
        childType: childType,
        setUpTime: setUpTime,
        description: description,
        footprint: footprint,
        property: _property
      })
        .subscribe(res => {
          console.log(res);
          if (res.code === 'success') {
            this.snackBar.openSnackBar('sucess');
            this.itemModify.doModify();

          }
        });
    }

  }
  changeForm(formType) {
    this.formFieldConfigs = this.formsPool[formType];
    setTimeout(() => {
      this.dynamicForm.setDisabled('submit', true);
    });
  }

}
