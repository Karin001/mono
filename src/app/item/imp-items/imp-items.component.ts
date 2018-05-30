import { Component, OnInit } from '@angular/core';
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
  _requiredPro = ['marking', 'quantity', 'footprint', 'name'];
  _optionPro = ['value', 'precise', 'childType', 'describe'];
  impProperties = {};
  distItems = [];
  constructor(souce) {
    this._souce = souce;
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
      if(this.impProperties.hasOwnProperty(ele['v'])) {
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
          //

        }
      }
      i++;
    }
  }
  propertyRequireVd() {

    this._requiredPro.forEach(property => {
      if (!Object.keys(this.impProperties).includes(property)) {
        this._valid = false;
        this._errorMessage.push(`require ${property}`);
      }
    });

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
  constructor() { }

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
      this.dataObj = new IMPdataObj(this.sheet);
      console.log(this.dataObj.impProperties);
      this.dataObj.propertyRequireVd();
      console.log(this.dataObj._valid, this.dataObj._errorMessage);
      if (!this.dataObj._valid) {
        throw new Error(this.dataObj._errorMessage.join(';'));
      }
      this.dataObj.chargeItem();
      console.log(this.dataObj);



      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsBinaryString(file);
  }
}
