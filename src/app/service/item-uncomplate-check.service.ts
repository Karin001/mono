import { Injectable } from '@angular/core';
import { RestapiService } from './restapi.service';
import { ItemModifyService } from './item-modify.service';
import { ItemFormatDataService } from './item-format-data.service';
@Injectable()
export class ItemUncomplateCheckService {

  constructor(
    private itemFormatDataService: ItemFormatDataService,
    private itemModify: ItemModifyService,
    private restApi: RestapiService
  ) { }

  resetAllUncomplateItem() {
    if (!this.restApi.localItemList || !this.restApi.localItemList.items) {
      throw new Error('unable to find localItemlist');
    }
    this.restApi.localItemList.items.forEach(item => {
      item['uncomplate'] = { status: false, property: [] };
      const mayCheckPro = this.itemFormatDataService.baseSets[item.name].filter(v => !['submit', 'customtag', 'childType'].includes(v));
      mayCheckPro.forEach(pro => {
        if (!item[pro] || item[pro] === '无') {
          item['uncomplate']['status'] = true;
          item['uncomplate']['property'].push(pro);
        }
      });
    });
    this.itemModify.doModify('uncomplateCheckOver');
  }

}
