import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ItemModifyService {
  itemModify = new BehaviorSubject<String>(null);
 
  complate = new BehaviorSubject<string>(null);
  search = new BehaviorSubject<any>(null);
  constructor() { }
  doModify(souce='modified') {
    this.itemModify.next(souce);
  }

  updateComplate() {
    this.complate.next('complate');
  }
  doSearch(data) {
    this.search.next({ 'state': 'search', 'data': data });
  }
  searchOver() {
    this.search.next({ 'state': 'search-over', 'data': []});
  }
  getSearchState(): Observable<any> {
    return this.search.asObservable();
  }
  getItemState(): Observable<String> {
    return this.itemModify.asObservable();
  }
  getItemUpdate(): Observable<string> {
    return this.complate.asObservable();
  }
}
