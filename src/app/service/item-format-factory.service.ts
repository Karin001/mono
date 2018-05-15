import { Injectable } from '@angular/core';
import { RestapiService } from './restapi.service';
import { MyValidators } from './myValidators';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../dynamic-form/interface/fieldConfig';
import { ItemFormatDataService } from './item-format-data.service';
@Injectable()
export class ItemFormatFactoryService {
  baseSets: { [types: string]: string[] } = {
    'RES': ['marking', 'childType', 'value', 'unit', 'footprint', 'precise', 'quantity', 'description', 'customtag', 'submit'],
    'CAP': ['marking', 'childType', 'value', 'unit', 'volt', 'footprint', 'quantity', 'description', 'customtag', 'submit'],
    'DIODE': ['marking', 'childType', 'value', 'footprint', 'quantity', 'description', 'customtag', 'submit'],
    'INDUCTOR': ['marking', 'childType', 'value', 'unit', 'footprint', 'quantity', 'description', 'customtag', 'submit'],
    'TRIODE': ['marking', 'childType', 'description', 'footprint', 'quantity', 'customtag', 'submit'],
    'MOS': ['marking', 'childType', 'description', 'footprint', 'quantity', 'customtag', 'submit'],
    'IC': ['marking', 'childType', 'description', 'footprint', 'quantity', 'customtag', 'submit'],
    'OSCILLATOR': ['marking', 'childType', 'value', 'unit', 'footprint', 'quantity', 'description', 'customtag', 'submit'],
    'ADD NEW TYPE': ['name', 'usevalue', 'usevolt', 'submit']
  };


  itemTypes: { [types: string]: string[] } = {
    'RES': ['无', '普通电阻', '可变电阻', '热敏电阻', '压敏电阻', '光敏电阻', '使用自定义子类'],
    'CAP': ['无', '电解电容', '陶瓷电容', '纸介电容', '云母电容', '薄膜电容', '使用自定义子类'],
    'DIODE': ['无', '普通二极管', '肖特基二极管', '整流二极管', '稳压二极管', '变容二极管', '发光二极管', '使用自定义子类'],
    'INDUCTOR': ['无', '使用自定义子类'],
    'TRIODE': ['无', 'NPN', 'PNP', '使用自定义子类'],
    'MOS': ['无', '使用自定义子类'],
    'IC': ['无', 'MCU', 'DSP', 'FPGA', 'CPLD', '使用自定义子类'],
    'OSCILLATOR': ['无', '使用自定义子类'],
    'ADD NEW TYPE': ['无', '使用自定义子类']
  };
  unitTypes: { [type: string]: string[] } = {
    'RES': ['Ω', 'kΩ', 'MΩ'],
    'CAP': ['pF', 'nF', 'uF', 'mF', 'F'],
    'OSCILLATOR': ['kHz', 'MHz'],
    'INDUCTOR': ['nH', 'uH', 'mH', 'H']
  };
  baseConfigSets = {
    'name': {
      type: 'input',
      label: '自定义主类',
      name: 'name',
      placeholder: '请为这种类别取个名字',
      disabled: false,
      validations: [Validators.required, this.myValidators.eng_numChar, Validators.maxLength(30), this.myValidators.dupilicateTypeFn()],
      error: { name: 'eng_numChar,maxlength', message: '输入限定为英文和数字,最多30个字符' }
    },
    'marking': {
      type: 'input',
      label: '型号',
      name: 'marking',
      placeholder: '',
      disabled: false,
      validations: [this.myValidators.eng_numChar,Validators.required, Validators.maxLength(30), this.myValidators.dupilicateMarkingFn()],
      error: { name: 'eng_numChar,maxlength', message: '输入限定为英文和数字,最多30个字符' }
    },

    'childType': {
      type: 'select',
      label: '子类型',
      name: 'childType',
      disabled: false,
      placeholder: '请选择子类',
      options: [],
      validations: [Validators.required],
    },
    'usevalue': {
      type: 'radio',
      label: '需要值吗',
      name: 'usevalue',
      disabled: false,
      placeholder: '',
      options: ['需要', '不需要'],
      validations: [Validators.required],
    },
    'usevolt': {
      type: 'radio',
      label: '需要耐压值吗',
      name: 'usevolt',
      disabled: false,
      placeholder: '',
      options: ['需要', '不需要'],
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
    'volt': {
      type: 'input',
      label: '耐压值（伏特）',
      name: 'volt',
      disabled: false,
      placeholder: '请输入3位以下数字',
      validations: [Validators.required, this.myValidators.volt],
      error: { name: 'volt', message: '输入限定为三位以下数字' }
    },
    'footprint': {
      type: 'autoInput',
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
      label: '器件描述',
      name: 'description',
      disabled: false,
      placeholder: '',
      validations: [Validators.maxLength(40)],
      error: { name: 'maxlength', message: '输入限定为40个以下字符' }
    },
    'customtag': {
      type: 'input',
      label: '自定义子类型',
      name: 'customtag',
      disabled: true,
      placeholder: '',
      validations: [Validators.maxLength(20)],

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
    public myValidators: MyValidators,
    public itemFormatData: ItemFormatDataService
  ) {
  }
  getItemTypes() {
    const newItemTypes = {};
    if (this.restapi.localItemList && this.restapi.localItemList.items) {
      this.restapi.localItemList.items.forEach(item => {
        if (!Object.keys(this.itemTypes).includes(item.name)) {
          const typeName = item.name;
          const childType = item.childType || '使用自定义子类';
          newItemTypes[typeName] = newItemTypes[typeName] || [''];
          newItemTypes[typeName]['push'](childType);

        } else {
          if (!this.itemTypes[item.name].includes(item.childType)) {
            this.itemTypes[item.name].push(item.childType);
          }
        }

      });

      this.itemTypes = { ...this.itemTypes, ...newItemTypes };
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
    // this.getItemTypes();
    for (const key in this.itemFormatData.itemTypes) {
      if (this.itemFormatData.itemTypes.hasOwnProperty(key)) {
        this.itemDynamicConfigs[key] = [];
        if (this.itemFormatData.baseSets.hasOwnProperty(key)) {
          this.itemFormatData.baseSets[key].forEach(element => {
            const tempConfig = { ...this.baseConfigSets[element] } as FieldConfig;


            if (element === 'childType') {
              tempConfig['options'] = []; //  必须这么做，因为之前无法深拷贝对象中的数组，此处为同一个数组引用
              tempConfig['options'] = this.itemFormatData.itemTypes[key];

            }
            if (element === 'unit') {
              tempConfig['options'] = [];
              tempConfig['options'] = this.itemFormatData.unitTypes[key];
            }
            this.itemDynamicConfigs[key]['push'](tempConfig);

          });
        } else {
          this.itemFormatData.baseSets['ADD NEW TYPE'].forEach(element => {
            const tempConfig = { ...this.baseConfigSets[element] } as FieldConfig;


            if (element === 'childType') {
              tempConfig['options'] = [];
              tempConfig['options'] = this.itemFormatData.itemTypes['ADD NEW TYPE'];

            }
            if (element === 'unit') {
              tempConfig['options'] = [];
              tempConfig['options'] = this.itemFormatData.unitTypes['ADD NEW TYPE'];
            }
            this.itemDynamicConfigs[key]['push'](tempConfig);

          });
        }

      }
    }

  }



}

