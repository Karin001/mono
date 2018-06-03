import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ItemSelectService {
  itemBroadcast = new BehaviorSubject<string[]>(null);
  constructor() { }
  doSelect(markings: string[]) {
    this.itemBroadcast.next(markings);
  }
  listenSelected(): Observable<string[]> {
    return this.itemBroadcast.asObservable();
  }
}
