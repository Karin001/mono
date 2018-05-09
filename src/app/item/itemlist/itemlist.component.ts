import { Component, NgZone, OnInit, ViewEncapsulation, Input, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RestapiService } from '../../service/restapi.service';
import { LocaldataService } from '../../localdata.service';
import { ItemSelectService } from '../../service/item-select.service';
import { ItemModifyService } from '../../service/item-modify.service';
import { ItemFormatDataService } from '../../service/item-format-data.service';
@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemlistComponent implements OnInit {

  progressBarSet = true;
  @Input() dackMode = false;
  rows;
  columns = [];
  selected;
  rowHeight = 25;
  selectedMarking;
  selectedChange;
  constructor(
    private router: Router,
    private restapi: RestapiService,
    private localdata: LocaldataService,
    private itemSelect: ItemSelectService,
    private zone: NgZone,
    private itemModify: ItemModifyService,
    private itemFormat: ItemFormatDataService
  ) {
    this.getDatas();
    // this.restapi.stream_allItem().subscribe((data) => {
    //   if (data['code'] === 'not_logIn') {
    //     this.rows = [];
    //     console.log(data['message']);
    //   } else if (data['code'] === 'no_data') {
    //     this.rows = [];
    //     console.log(data['message']);
    //   } else {
    //     console.log(data);
    //     this.rows = data['fb']['items'];
    //     this.localdata.localData = data['fb']['items'];
    //   }

    // })
  }
  getDatas() {
    this.restapi.stream_allItem()
      .catch((e: HttpErrorResponse) => {
        this.progressBarSet = false;
        this.itemFormat.loadTypes();
        throw (e);
      })
      .subscribe(res => {
        console.log('123213123');
        this.progressBarSet = false;
        
        if (res['fb']) {
          this.rows = res['fb']['items'];

          this.restapi.localItemList = res['fb'];
          this.itemModify.updateComplate();
          console.log('base', this.itemFormat.baseSets);
          console.log(this.restapi.localItemList);
        }
        this.itemFormat.loadTypes();
      });
  }
  ngOnInit() {
    this.columns = [
      { prop: 'name', name: '主类' },
      { prop: 'marking', name: '型号' },
      { prop: 'quantity', name: '数量' },
    ];
    this.itemModify.getItemState().subscribe(state => {
      if (state === 'modified') {
        this.getDatas();
      }
    })

  }
  public onSelect({ selected }): void {
    this.zone.run(() => {
      console.log('Select Event', selected);
      if (this.selectedMarking === selected[0]['marking']) {
        this.selectedChange = false;
      } else {
        this.itemSelect.doSelect(selected[0]['marking']);
        this.selectedChange = true;
        this.selectedMarking = selected[0]['marking'];

        // this.router.navigateByUrl("/itemlist/" + this.selectedNumber);
      }
    });
  }
  // onSelect({ selected }) {
  //   console.log('Select Event', selected);
  //   if (this.selectedNumber === selected[0]['number']) {
  //     this.selectedChange = false;
  //   } else {
  //     this.itemSelect.doSelect(selected[0]['marking']);
  //     this.selectedChange = true;
  //     this.selectedNumber = selected[0]['number'];
  //     //this.router.navigateByUrl("/itemlist/" + this.selectedNumber);
  //   }

  //   this.select = true;

  // }

  // 只需更改此函数即可更换图片数据来源，数据格式需要与imglist.json一致
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
