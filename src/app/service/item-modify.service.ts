import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ItemModifyService {
  itemModify = new BehaviorSubject<String>(null);
  complate = new BehaviorSubject<string>(null);
  constructor() { }
  doModify(){
    this.itemModify.next('modified')
  }
  updateComplate(){
    this.complate.next('complate')
  }

  getItemState():Observable<String>{
    return this.itemModify.asObservable()
  }
  getItemUpdate():Observable<string>{
    return this.complate.asObservable()
  }
}
