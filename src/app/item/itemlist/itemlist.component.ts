import { Component, OnInit, ViewEncapsulation, Input, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from '../../restapi.service';
import { LocaldataService } from '../../localdata.service';
@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemlistComponent implements OnInit {


  @Input() dackMode = false;
  rows;
  columns = [];
  select;
  selectedNumber;
  selectedChange;
  constructor(
    private router: Router,
    private restapi: RestapiService,
    private localdata: LocaldataService
  ) {
    // this.fetch((data) => {
    //   this.rows = data;
    // });
    this.restapi.stream_allItem().subscribe((data) => {
      if (data['code'] === 'not_logIn') {
        this.rows = [];
        console.log(data['message']);
      } else if (data['code'] === 'no_data') {
        this.rows = [];
        console.log(data['message']);
      } else {
        console.log(data);
        this.rows = data['fb']['items'];
        this.localdata.localData = data['fb']['items'];
      }

    })
  }

  ngOnInit() {
    this.columns = [
      { prop: 'name', name: '名称' },
      { prop: 'marking', name: '型号' },
      { prop: 'quantity', name: '数量' },
      { prop: 'unit', name: '单位' },
      { prop: 'where', name: '位置' },
      { prop: 'number', name: '系统编号' }
    ];
  }
  onSelect({ selected }) {
    console.log('Select Event', selected);
    if (this.selectedNumber === selected[0]['number']) {
      this.selectedChange = false;
    } else {
      this.selectedChange = true;
      this.selectedNumber = selected[0]['number'];
      this.router.navigateByUrl("/itemlist/" + this.selectedNumber)
    }

    this.select = true;

  }

  //只需更改此函数即可更换图片数据来源，数据格式需要与imglist.json一致
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/itemlist.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.localdata.localData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page

  }
}
