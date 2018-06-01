const BASESETS = {
  'RES': ['marking', 'childType', 'value', 'unit', 'footprint', 'precise', 'quantity', 'description', 'customtag', 'submit'],
  'CAP': ['marking', 'childType', 'value', 'unit', 'volt', 'footprint', 'quantity', 'description', 'customtag', 'submit'],
  'DIODE': ['marking', 'childType',  'footprint', 'quantity', 'description', 'customtag', 'submit'],
  'INDUCTOR': ['marking', 'childType', 'value', 'unit', 'footprint', 'quantity', 'description', 'customtag', 'submit'],
  'TRIODE': ['marking', 'childType', 'description', 'footprint', 'quantity', 'customtag', 'submit'],
  'MOS': ['marking', 'childType', 'description', 'footprint', 'quantity', 'customtag', 'submit'],
  'IC': ['marking', 'childType', 'description', 'footprint', 'quantity', 'customtag', 'submit'],
  'OSCILLATOR': ['marking', 'childType', 'value', 'unit', 'footprint', 'quantity', 'description', 'customtag', 'submit'],
  'ADD NEW TYPE': ['name', 'usevalue', 'usevolt', 'submit']
};
export const ITEMTYPES = {
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
export const UNITTYPES = {
  'RES': ['R', 'kR', 'MR'],
  'CAP': ['pF', 'nF', 'uF', 'mF', 'F'],
  'OSCILLATOR': ['kHz', 'MHz'],
  'INDUCTOR': ['nH', 'uH', 'mH', 'H']
};
import { Injectable } from '@angular/core';
import { RestapiService } from './restapi.service';
@Injectable()
export class ItemFormatDataService {
  baseSets: { [types: string]: string[] } = BASESETS;


  itemTypes: { [types: string]: string[] } = ITEMTYPES;
  unitTypes: { [type: string]: string[] } = UNITTYPES;
  constructor(
    private restapi: RestapiService
  ) {
   
   }
   loadTypes() {
    console.log('数据',this.restapi.localItemList);
    if(this.restapi.localItemList && this.restapi.localItemList.itemTypes){
      this.baseSets = this.restapi.localItemList.itemTypes['baseSets'];
      this.itemTypes = this.restapi.localItemList.itemTypes['itemTypes'];
      this.unitTypes = this.restapi.localItemList.itemTypes['unitTypes'];
      console.log('baseSets',this.baseSets);
    } else {
      this. baseSets = BASESETS;


      this.itemTypes = ITEMTYPES;
      this.unitTypes = UNITTYPES;
    }
      console.log('itemtypes', this.itemTypes);
   }

}
