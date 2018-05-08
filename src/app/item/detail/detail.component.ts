import { Component, OnInit, Input } from '@angular/core';
import { ItemSelectService } from '../../service/item-select.service';
import { RestapiService } from '../../service/restapi.service';
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  number;
  detailInfo: any = {};
  @Input() disable;
  constructor(
    private restapi: RestapiService,
    private itemSelect: ItemSelectService
  ) { }
  sel(e) {
    console.log('1', e);
  }
  onclick(item) {
    item['stat'] = true ? false : true;
    console.log('itemStat', item['stat']);
  }
  ngOnInit() {
    this.itemSelect.listenSelected().subscribe(marking => {
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
                  } else if(key === 'precise'){
                    this.detailInfo.property.push({pro:'精度:'+item.property['precise']})

                  } else if(key === 'volt'){
                    this.detailInfo.property.push({pro:'耐压值:'+item.property['volt']+'v'})
                  }
                }
              }
              if(val.join('') !== ''){
                this.detailInfo.property.push({pro:'值:'+ val.join('')});
              }
            }
            this.detailInfo.property.push({pro:'封装:'+ item.footprint});
            this.detailInfo.property.push({pro:'子类:' + item.childType});
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
