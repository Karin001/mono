import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UpdateComponent } from '../update/update.component';
import { ItemSelectService } from '../../service/item-select.service';
import { RestapiService } from '../../service/restapi.service';
import { ItemModifyService } from '../../service/item-modify.service';
import { ItemFormatDataService } from '../../service/item-format-data.service';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-show-property',
  templateUrl: './show-property.component.html',
  styleUrls: ['./show-property.component.scss']
})
export class ShowPropertyComponent implements OnInit {

  selectedMarking;
  selectedName;
  unComplateTag = false;
  checkPro;
  detailInfo: any = {};
  findOptions = {
    selected: []
  };
  @Input() disable;
  @Input() searchOn:boolean = true;
  constructor(
    private restapi: RestapiService,
    private itemSelect: ItemSelectService,
    private itemModify: ItemModifyService,
    private dialog: MatDialog,
    private itemFormatDataService: ItemFormatDataService
  ) { }
  sel(e) {
    console.log('1', e);
  }
  onclick(item) {
    if(!this.searchOn){
      return;
    }
    item['state'] = item['state'] === true ? false : true;
    console.log('itemStat', item['state']);
    this.detailInfo.property.forEach(item => {
      if (item['state']) {
        this.findOptions['name'] = item['bigname'];
        this.findOptions[item['name']] = item['value'];
        if (!this.findOptions.selected.includes(item['name'])) {
          console.log(123123213);
          this.findOptions.selected.push(item['name']);
          console.log(this.findOptions.selected);
        }


      } else {
        this.findOptions[item['name']] = undefined;
        this.findOptions.selected = this.findOptions.selected.filter(name => name!==item['name']);
        //this.findOptions.selected.splice(this.findOptions.selected.indexOf(item['name']), 1);
        //this.itemModify.searchOver();
      }
    })
    if (this.findOptions.selected.length > 0) {
      this.itemModify.doSearch(this.restapi.localFind(this.findOptions));
    } else{
      this.itemModify.searchOver();
    }

  }
  ngOnInit() {
    this.itemSelect.listenSelected().filter(markings => !!markings && markings.length > 0).subscribe(markings => {
      this.selectedMarking = markings[0];

      this.findOptions = {
        selected: []
      };
      this.findSelectedItem();

    });

    this.itemModify.getItemUpdate().subscribe(state => {
      if (state === 'complate') {
        this.findSelectedItem();
      }

    });

  }
  findUncomplateProperty(item) {

    const mayCheckPro = this.itemFormatDataService.baseSets[this.selectedName]
      .filter(v => !['marking', 'quantity', 'description', 'customtag', 'submit'].includes(v));
    this.checkPro = mayCheckPro.map(v => {
      const value = { [v]: false };
      return value;
    });
    this.checkPro.forEach(pro => {
      const key = Object.keys(pro)[0];
      this.unComplateTag = false;
      if (!item['hasOwnProperty'](key) || item[key]==='无') {
        pro[key] = true;
        item['unComplate'] = true;
        this.unComplateTag = true;
      }
    });
    console.log('itemComplate', item['unComplate']);
  }
  findSelectedItem() {
    if (this.restapi.localItemList) {
      this.restapi.localItemList.items.forEach(item => {
        if (item.marking === this.selectedMarking) {
          this.selectedName = item.name;
          this.detailInfo['property'] = [];
          this.detailInfo['setUpTime'] = item.setUpTime;
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
                  this.detailInfo.property.push({
                    bigname: item.name,
                    name: 'precise', 
                    value: item.property['precise'],
                    pro: '精度:' + item.property['precise']
                  });

                } else if (key === 'volt') {
                  this.detailInfo.property.push({
                    bigname: item.name,
                    name: 'volt',
                    value: item.property['volt'],
                    pro: '耐压值:' + item.property['volt'] + 'v'
                  });
                }
              }
            }
            if (val.join('') !== '') {
              this.detailInfo.property.push({
                bigname: item.name,
                name: 'value',
                value: val.join(''),
                pro: '值:' + val.join('')
              });
            }
          }
          this.detailInfo.property.push({
            bigname: item.name,
            name: 'footprint',
            value: item.footprint,
            pro: '封装:' + item.footprint
          });
          this.detailInfo.property.push({
            bigname: item.name,
            name: 'childType',
            value: item.childType,
            pro: '子类:' + item.childType
          });
          this.detailInfo.property.push({
            bigname: item.name,
            name: 'brand',
            value: item.brand,
            pro: '品牌:' + (item.brand || '无')
          });
          this.detailInfo.property.push({
            bigname: item.name,
            name: 'description',
            value: item.description,
            pro: '描述:' + item.description || '无'
          })
          this.detailInfo['quantity'] = item.quantity;
          this.detailInfo['marking'] = item.marking;
          this.detailInfo['project'] = item.project || [];
          this.detailInfo['brand'] = item.brand || '无';
          this.detailInfo['description'] = item.description || '无';

          console.log(this.detailInfo);
          this.findUncomplateProperty(item);
          return;
        }
      });
    }
  }
  openDialog(option, value) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '500px',
      data: {
        marking: this.selectedMarking,
        name: this.selectedName,
        defaltValue: value,
        option: option
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  update(option: string) {
    let defaltValue;
    if (option === 'quantity' || option === 'marking') {
      defaltValue = this.detailInfo[option];
    } else {
      defaltValue = (this.detailInfo.property.find((v) => v['name'] === option))['value'];
    }
    this.openDialog(option, defaltValue);
  }


}
