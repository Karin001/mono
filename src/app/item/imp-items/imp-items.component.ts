import { Component, OnInit } from '@angular/core';
import { MyValidators } from '../../service/myValidators';
import { RestapiService } from '../../service/restapi.service';
import { ItemFormatDataService, ITEMTYPES } from '../../service/item-format-data.service';
import * as XLSX from 'xlsx';
const colCode = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

interface ValidatorFns {
  marking: Function;
  value?: Function;
  quantity: Function;
  precise: Function;
  manufacturer: Function;
  childType: Function;
  name: Function;
  description: Function;
}
class IMPdataObj {
  _souce: XLSX.Sheet;
  _range: string[] = [];
  _startCol = '';
  _startColIndex = 0;
  _startRow = '';
  _itemsNum: number = 0;
  _valid: boolean = true;
  _errorMessage = [];
  _hintMessage = [];
  _requiredPro = ['marking', 'quantity', 'footprint', 'name'];
  _optionPro = ['value', 'precise', 'volt', 'brand','description'];
  impProperties = {};
  usedMarking = [];
  useditemTypes = {}
  distItems = [];

  constructor(souce, localItems = [], itemType) {
    this._souce = souce;
    this.usedMarking = localItems.map(item => item['marking']);
    this.useditemTypes = itemType;
    this._range = this._souce['!ref'].split(':');
    this.getStartPoint();
    this.chargePro();
  }
  getStartPoint() {
    this._startCol = this._range[0][0];
    this._startColIndex = colCode.indexOf(this._startCol);
    this._startRow = this._range[0][1];
  }
  getCol(index) {
    return colCode[index];
  }
  chargePro() {
    let i = this._startColIndex;
    while (this._souce[this.getCol(i) + (this._startRow + '')] && this._souce[this.getCol(i) + (this._startRow + '')]['v']) {
      const col_addr = this.getCol(i);
      const ele = this._souce[col_addr + (this._startRow + '')];
      console.log('ele', ele);
      ele['v'] = ele['v'].toLowerCase();
      if (this.impProperties.hasOwnProperty(ele['v'])) {
        this._valid = false;
        this._errorMessage.push(`${ele['v']} duplicate`);
        throw new Error(this._errorMessage.join(';'));
      }
      this.impProperties[ele['v']] = {};
      this.impProperties[ele['v']]['col_addr'] = col_addr;
      i++;
    }
  }
  chargeItem() {
    let i = 0;
    const firstDataRow = Number(this._startRow) + 1;
    console.log('markingCode', this.impProperties['marking']['col_addr'] + (i + firstDataRow));
    console.log('marking', this._souce[this.impProperties['marking']['col_addr'] + (i + firstDataRow)]);
    while (
      this._souce[this.impProperties['marking']['col_addr'] + (i + firstDataRow)] &&
      this._souce[this.impProperties['marking']['col_addr'] + (i + firstDataRow)]['v']
    ) {
      this.distItems[i] = {};
      for (const key in this.impProperties) {

        if (this.impProperties.hasOwnProperty(key)) {

          if (this._souce[this.impProperties[key]['col_addr'] + (i + firstDataRow)] &&
            this._souce[this.impProperties[key]['col_addr'] + (i + firstDataRow)]['v']) {
            this.distItems[i][key] = this._souce[this.impProperties[key]['col_addr'] + (i + firstDataRow)]['v'];
          }


        }
      }
      i++;
    }
  }
  dupOrMissVd() {
    const Kulaberu = this.distItems
      .filter(item => {
        if (!item['marking']) {
          this._valid = false;
          this._errorMessage.push('缺少marking');
          return false;
        } else {
          return true;
        }
      })
      .map(item => item['marking']);
    const impName = this.distItems
      .filter(item => {
        if (!item['name']) {
          this._valid = false;
          this._errorMessage.push('缺少name');
          return false;
        } else {
          return true;
        }
      })
      .map(item => item['name']);

    if (Array.from(new Set(Kulaberu)).length === Kulaberu.length) {
      this._valid = false;
      this._errorMessage.push('你提交的marking有重复！')
      throw new Error(this._errorMessage.join(';'));
    }
    Kulaberu.forEach(marking => {
      if (this.usedMarking.map(item=>item.toUpperCase()).includes(marking.toUpperCase())) {
        this._valid = false;
        this._errorMessage.push(`${marking.toUpperCase()}与数据库中的重复了`)
      }
    });
    Array.from(new Set(impName)).forEach(name => {
      if (!Object.keys(this.useditemTypes).map(item=> item.toUpperCase()).includes(name.toUpperCase())) {
        console.log('useditemTypes', this.useditemTypes);
        this._hintMessage.push(`新增主类：${name.toUpperCase()}`);
      }
    });


  }
  itemVd(pro, item) {

    const tempValue = {};
    if (['marking', 'footprint', 'name'].includes(pro)) {

      if (!MyValidators.futsuuVdForImp(item[pro])) {
        this._valid = false;
        this._errorMessage.push(`${item['marking']}的${pro}校验失败:${item[pro]}`);
      }
      item[pro] = item[pro].toUpperCase();
      


    } else if (pro === 'quantity') {
      if (!MyValidators.quantityForImp(item[pro])) {
        this._valid = false;
        this._errorMessage.push(`${item['marking']}的${pro}校验失败:${item[pro]}`);
      }
    } else if (pro === 'value') {
      if (['RES', 'INDUCTOR', 'CAP', 'OSCILLATOR'].includes(item['name'])) {
        console.log('typeIn', item['name']);

        if (MyValidators.valAndReSetForImp(item[pro], item['name'], tempValue)) {
          console.log('tempvalue$$$', tempValue);
          item[pro] = tempValue['value'];
          item['unit'] = tempValue['unit'];
          // console.log('item',item);
        } else {
          this._valid = false;
          this._errorMessage.push(`${item['marking']}的${pro}校验失败:${item[pro]}`)
        }
      } else {
        if (!MyValidators.futsuuVdForImp(item[pro])) {
          this._valid = false;
          this._errorMessage.push(`${item['marking']}的${pro}校验失败:${item[pro]}`);
        }
        if(!item['description']){
          item['description'] = item[pro];
        }
      }

    } else if (pro === 'volt') {
      if (!MyValidators.voltForImp(item[pro])) {
        this._valid = false;
        this._errorMessage.push(`${item['marking']}的${pro}校验失败:${item[pro]}`);
      }
    } else if (pro === 'precise') {
      if (!MyValidators.preciseForImp(item[pro])) {
        this._valid = false;
        this._errorMessage.push(`${item['marking']}的${pro}校验失败:${item[pro]}`);
      }
    }
    else if (['brand'].includes(pro)) {
      if (item[pro]['length'] >= 30) {
        this._valid = false;
        this._errorMessage.push(`${pro}校验失败:${item[pro]}`);

      }
    }

  }
  propertyRequireVd() {

    this._requiredPro.forEach(property => {
      if (!Object.keys(this.impProperties).includes(property)) {
        this._valid = false;
        this._errorMessage.push(`require ${property}`);
      }
    });
    this._optionPro.forEach(property => {
      if (!Object.keys(this.impProperties).includes(property)) {
        this._hintMessage.push(`missing ${property}`);
      }
    })
    Object.keys(this.impProperties).forEach(pro => {
      if (![...this._optionPro, ...this._requiredPro].includes(pro)) {
        this._hintMessage.push(`unuseful ${pro}`)
      }
    })

  }
}
@Component({
  selector: 'app-imp-items',
  templateUrl: './imp-items.component.html',
  styleUrls: ['./imp-items.component.scss']
})
export class ImpItemsComponent implements OnInit {
  dataObj: IMPdataObj;
  workbook: XLSX.WorkBook;
  name: string;
  sheet: XLSX.Sheet;
  items = [];
  constructor(
    private restApi: RestapiService,
    private itemFormatData: ItemFormatDataService
  ) {
  }

  ngOnInit() {
  }

  charge() {

  }
  onOver(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  onDrop(e) {
    console.log('e', e);
    e.stopPropagation();
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target['result'];
      this.workbook = XLSX.read(data, { type: 'binary' });
      this.name = this.workbook.SheetNames[0];
      console.log('sheet1', this.workbook.Sheets[this.name]);
      this.sheet = this.workbook.Sheets[this.name];
      const localItem =
        this.restApi.localItemList && this.restApi.localItemList.items ?
          this.restApi.localItemList.items :
          [];
      this.dataObj = new IMPdataObj(this.sheet, localItem, this.itemFormatData.itemTypes);
      console.log(this.dataObj.impProperties);
      this.dataObj.propertyRequireVd();
      console.log(this.dataObj._valid, this.dataObj._errorMessage);
      if (!this.dataObj._valid) {
        throw new Error(this.dataObj._errorMessage.join(';'));
      }
      this.dataObj.chargeItem();
      console.log(this.dataObj);
      this.dataObj.dupOrMissVd();
      if (!this.dataObj._valid) {
        throw new Error(this.dataObj._errorMessage.join(';'));
      } else {
        console.log(this.dataObj._hintMessage);
      }
      this.dataObj.distItems.forEach(item => {

        for (const pro in item) {
          if (item.hasOwnProperty(pro)) {
            this.dataObj.itemVd(pro, item);
            if(pro === 'name'){
              if(!Object.keys(this.itemFormatData.baseSets).includes(item[pro])){
                this.itemFormatData.baseSets[item[pro]].push('marking', 'childType', 'footprint', 'quantity', 'description', 'customtag');
                if(item['volt']){
                  this.itemFormatData.baseSets[item[pro]].push('volt');
                }
                this.itemFormatData.baseSets[item[pro]].push('submit')
              }
            }
          }
        }
      });
      console.log(this.dataObj);


      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsBinaryString(file);
  }
}
