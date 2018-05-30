import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

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
  _range: string[] = [];
  _itemsNum: number = 0;
  _valid: boolean = false;
  _errorMessage: { code: string; message: string };
  _rowCode = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  markingAddr: string = '';
  validatorFns: ValidatorFns;
  footprintAddr: string = '';
  nameAddr: string = '';
  quantityAddr: string = '';
  valueAddr: string = '';
  preciseAddr: string = '';
  manufacturerAddr: string = '';
  childTypeAddr: string = '';
  descriptionAddr: string = '';
  constructor() {

  }
}
@Component({
  selector: 'app-imp-items',
  templateUrl: './imp-items.component.html',
  styleUrls: ['./imp-items.component.scss']
})
export class ImpItemsComponent implements OnInit {
  dataObj: IMPdataObj = new IMPdataObj();
  workbook: XLSX.WorkBook;
  name: string;
  sheet: XLSX.Sheet;
  items = [];
  constructor() { }

  ngOnInit() {
  }

  charge() {
    const firstIndex = this.dataObj._rowCode.indexOf(this.dataObj._range[0][0]);
    if (firstIndex === -1) {
      throw new Error('range outside!');

    }

    for (let i = firstIndex; this.sheet[i] !== ''; i++) {
      const ele = this.sheet[this.dataObj._rowCode[i]] as string;
      if (Object.keys(this.dataObj).includes(ele['v'] + 'Addr')) {
        this.dataObj[ele['v'] + 'Addr'] = this.dataObj._rowCode[i];
      }
    }
    if (this.dataObj.markingAddr === '' ||
      this.dataObj.quantityAddr === '' ||
      this.dataObj.nameAddr === '' ||
      this.dataObj.footprintAddr === ''
    ) {
      this.dataObj._valid = false;
      throw new Error('you must follw the format');
    } else {
      this.dataObj._valid = true;
    }
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
      this.dataObj._range = this.sheet['!ref'].split(':');
      this.charge();
      console.log(this.dataObj);


      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsBinaryString(file);
  }
}
