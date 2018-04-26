import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ItemModifyService {
  itemModify = new BehaviorSubject<String>(null);
  constructor() { }
  doModify(){
    this.itemModify.next('modified')
  }

  getItemState():Observable<String>{
    return this.itemModify.asObservable()
  }
}
