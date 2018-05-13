import { Component, OnInit, Input } from '@angular/core';
import { ItemSelectService } from '../../service/item-select.service';
import { RestapiService } from '../../service/restapi.service';
import { ItemModifyService } from '../../service/item-modify.service';
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  number;
  detailInfo: any = {};
  findOptions = {
    selected: []
  };
  @Input() disable;
  constructor(
    private restapi: RestapiService,
    private itemSelect: ItemSelectService,
    private itemModify: ItemModifyService
  ) { }
  sel(e) {
    console.log('1', e);
  }
  onclick(item) {
    item['state'] = item['state'] === true ? false : true;
    console.log('itemStat', item['state']);
    if (item['state']) {

      this.findOptions['marking'] =
        this.findOptions['name'] = item['bigname'];
      this.findOptions[item['name']] = item['value'];
      this.findOptions.selected.push(item['name']);

    } else {
      this.findOptions[item['name']] = undefined;
      this.findOptions.selected.splice(this.findOptions.selected.indexOf(item['name']), 1);
      this.itemModify.searchOver();
    }
    if (this.findOptions.selected.length > 0) {
      this.itemModify.doSearch(this.restapi.localFind(this.findOptions));
    }

  }
  ngOnInit() {
    this.itemSelect.listenSelected().subscribe(marking => {
      this.findOptions = {
        selected: []
      };
      if (this.restapi.localItemList) {
        this.restapi.localItemList.items.forEach(item => {
          if (item.marking === marking) {
            this.detailInfo['property'] = [];
            this.detailInfo['setUpTime'] = item.setUpTime;
            // if (item.property && item.property['unit'] && item.property['value']) {
            //   this.detailInfo['property'].push({'value': item.property['value'] + '' + item.property['unit']});
            // }
            if (item.property) {
              this.detailInfo.property = [];
              const elseProperty = item.property;
              const val = [];
              for (const key in item.property) {
                if (item.property.hasOwnProperty(key)) {
                  const element = item.property[key];
                  if (key === 'value') {
                    val[0] = element;
                  } else if (key === 'unit') {
                    val[1] = element;
                  } else if (key === 'precise') {
                    this.detailInfo.property.push({ bigname: item.name, name: 'precise', value: item.property['precise'], pro: '精度:' + item.property['precise'] })

                  } else if (key === 'volt') {
                    this.detailInfo.property.push({ bigname: item.name, name: 'volt', value: item.property['volt'], pro: '耐压值:' + item.property['volt'] + 'v' })
                  }
                }
              }
              if (val.join('') !== '') {
                this.detailInfo.property.push({ bigname: item.name, name: 'value', value: val.join(''), pro: '值:' + val.join('') });
              }
            }
            this.detailInfo.property.push({ bigname: item.name, name: 'footprint', value: item.footprint, pro: '封装:' + item.footprint });
            this.detailInfo.property.push({ bigname: item.name, name: 'childType', value: item.childType, pro: '子类:' + item.childType });
            this.detailInfo['quantity'] = item.quantity;
            this.detailInfo['project'] = item.project || [];

            console.log(this.detailInfo);
            return;
          }
        })
      }

    })
    // this.activatedRoute.params
    // .mergeMap((data) => {
    //   console.log(data['number']);
    //   this.number = data['number'];
    //   return this.restapi.streamMock_itemDetail();
    // })
    // .subscribe((details) =>{
    //   console.log(details);
    //   this.detailInfo = details[this.number];

    // })
  }



}
