import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-imp-items',
  templateUrl: './imp-items.component.html',
  styleUrls: ['./imp-items.component.scss']
})
export class ImpItemsComponent implements OnInit {
  range = [];
  workbook: XLSX.WorkBook;
  sheet: XLSX.Sheet;
  constructor() { }

  ngOnInit() {
  }
 
  onOver(e){
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
      const name = this.workbook.SheetNames[0];
      console.log('sheet1', this.workbook.Sheets[name]);
      this.sheet = this.workbook.Sheets[name];
      this.range = this.sheet['!ref'].split(':');
      console.log('range',this.range);

      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsBinaryString(file);
  }
}
