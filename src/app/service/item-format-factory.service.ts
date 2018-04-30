import { Injectable } from '@angular/core';
import { RestapiService } from './restapi.service';
import { MyValidators } from './myValidators';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../dynamic-form/interface/fieldConfig';
@Injectable()
export class ItemFormatFactoryService {
  baseSets: { [types: string]: string[] } = {
    'RES': ['marking', 'childType', 'value', 'unit', 'footprint', 'precise', 'quantity', 'description', 'customtag', 'submit'],
    'CAP': ['marking', 'childType', 'value', 'unit', 'footprint', 'quantity', 'description', 'customtag', 'submit'],
    'DIODE': ['marking', 'childType', 'value', 'footprint', 'quantity', 'description', 'customtag', 'submit'],
    'INDUCTOR': ['marking', 'childType', 'value', 'unit', 'footprint', 'quantity', 'description', 'customtag', 'submit'],
    'TRIODE': ['marking', 'childType', 'description', 'footprint', 'quantity', 'customtag', 'submit'],
    'MOS': ['marking', 'childType', 'description', 'footprint', 'quantity', 'customtag', 'submit'],
    'IC': ['marking', 'childType', 'description', 'footprint', 'quantity', 'customtag', 'submit'],
    'Others': ['marking', 'childType', 'description', 'footprint', 'quantity', 'customtag', 'submit']
  };


  itemTypes: { [types: string]: string[] } = {
    'RES': ['普通电阻', '可变电阻', '热敏电阻', '压敏电阻', '光敏电阻', '使用自定义子类'],
    'CAP': ['电解电容', '陶瓷电容', '纸介电容', '云母电容', '薄膜电容', '使用自定义子类'],
    'DIODE': ['普通二极管', '肖特基二极管', '整流二极管', '稳压二极管', '变容二极管', '发光二极管', '使用自定义子类'],
    'INDUCTOR': ['使用自定义子类'],
    'TRIODE': ['NPN', 'PNP', '使用自定义子类'],
    'MOS': ['使用自定义子类'],
    'IC': ['MCU', 'DSP', 'FPGA', 'CPLD', '使用自定义子类'],
    'OSCILLATOR': ['使用自定义子类'],
    'Others': ['使用自定义子类']
  };
  unitTypes: { [type: string]: string[] } = {
    'RES': ['Ω', 'kΩ', 'MΩ'],
    'CAP': ['pF', 'nF', 'uF', 'mF', 'F'],
    'INDUCTOR': ['nH', 'uH', 'mH', 'H']
  };
  baseConfigSets = {
    'marking': {
      type: 'input',
      label: '型号',
      name: 'marking',
      placeholder: '',
      disabled: false,
      validations: [this.myValidators.eng_numChar, Validators.maxLength(30), this.myValidators.dupilicateMarkingFn()],
      error: { name: 'eng_numChar,maxlength', message: '输入限定为英文和数字,最多30个字符' }
    },

    'childType': {
      type: 'select',
      label: '类型',
      name: 'childType',
      disabled: false,
      placeholder: '',
      options: [],
      validations: [Validators.required],
    },
    'value': {
      type: 'input',
      label: '值',
      name: 'value',
      disabled: false,
      placeholder: '',
      validations: [Validators.required, this.myValidators.num_point, Validators.maxLength(10)],
      error: { name: 'num_point,maxlength', message: '输入限定为10位以下数字，最多两位小数' }
    },
    'unit': {
      type: 'radio',
      label: '单位',
      name: 'unit',
      disabled: false,
      placeholder: '',
      options: [],
      validations: [Validators.required],
    },
    'footprint': {
      type: 'input',
      label: '封装',
      name: 'footprint',
      disabled: false,
      placeholder: '',
      validations: [Validators.required, this.myValidators.footprint, Validators.maxLength(30)],
      error: { name: 'footprint,maxlength', message: '输入限定为英文和数字，或特殊符号横杠-,最多30个字符 ' }
    },
    'precise': {
      type: 'radio',
      label: '精度',
      name: 'precise',
      disabled: false,
      placeholder: '',
      options: ['1%', '5%', '10%', '15%'],
      validations: [Validators.required]
    },
    'quantity': {
      type: 'input',
      label: '已采购数量',
      name: 'quantity',
      value: '0',
      disabled: false,
      placeholder: '',
      validations: [Validators.required, this.myValidators.quantity],
      error: { name: 'quantity', message: '输入限定为有意义的数字，未采购填0' }
    },
    'description': {
      type: 'input',
      label: '描述',
      name: 'description',
      disabled: false,
      placeholder: '',
      validations: [Validators.maxLength(40)],
      error: { name: 'maxlength', message: '输入限定为40个以下字符' }
    },
    'customtag': {
      type: 'input',
      label: '自定义子类',
      name: 'customtag',
      disabled: false,
      placeholder: '',
      validations: [Validators.maxLength(20)],
      error: { name: 'maxlength', message: '输入限定为20个以下字符' }
    },
    'submit': {
      label: 'Submit',
      name: 'submit',
      type: 'button',
      disabled: false,
    }


  };

  footprints: string[] = [];
  itemDynamicConfigs: { [formType: string]: FieldConfig[] } = {};
  constructor(
    public restapi: RestapiService,
    public myValidators: MyValidators
  ) {
  }
  getItemTypes() {
    const newItemTypes = {};
    if (this.restapi.localItemList && this.restapi.localItemList.items) {
      this.restapi.localItemList.items.forEach(item => {
        const typeName = item.name;
        const childType = item.childType || '';
        newItemTypes[typeName] = newItemTypes[typeName] || [''];
        newItemTypes[typeName]['push'](childType);
      });
      for (const key in newItemTypes) {
        if (newItemTypes.hasOwnProperty(key)) {
          newItemTypes[key].push('使用自定义子类');
        }
      }
      this.itemTypes = newItemTypes;
    }
  }

  getfootprints() {
    if (this.restapi.localItemList && this.restapi.localItemList.items) {
      this.restapi.localItemList.items.forEach(item => {
        const footptint = item.footprint || '';
        if (!this.footprints.includes(footptint)) {
          this.footprints.push(footptint);
        }
      });
    }
  }
  creatDynamicFormConfig() {
    this.getItemTypes();
    for (const key in this.itemTypes) {
      if (this.itemTypes.hasOwnProperty(key)) {
        this.itemDynamicConfigs[key] = [];
        if (this.baseSets.hasOwnProperty(key)) {
          this.baseSets[key].forEach(element => {
            const tempConfig = { ...this.baseConfigSets[element] } as FieldConfig;


            if (element === 'childType') {
              tempConfig['options'] = []; //  必须这么做，因为之前无法深拷贝对象中的数组，此处为同一个数组引用
              tempConfig['options'] = this.itemTypes[key];

            }
            if (element === 'unit') {
              tempConfig['options'] = [];
              tempConfig['options'] = this.unitTypes[key];
            }
            this.itemDynamicConfigs[key]['push'](tempConfig);

          });
        } else {
          this.baseSets['Others'].forEach(element => {
            const tempConfig = { ...this.baseConfigSets[element] } as FieldConfig;


            if (element === 'childType') {
              tempConfig['options'] = [];
              tempConfig['options'] = this.itemTypes['Others'];

            }
            if (element === 'unit') {
              tempConfig['options'] = [];
              tempConfig['options'] = this.unitTypes['Others'];
            }
            this.itemDynamicConfigs[key]['push'](tempConfig);

          });
        }

      }
    }

  }



}

