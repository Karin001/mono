import { Injectable } from '@angular/core';

@Injectable()
export class ItemUncomplateCheckService {

  constructor() { }
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

}
