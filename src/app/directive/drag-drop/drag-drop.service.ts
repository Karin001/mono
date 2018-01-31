import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class DragDropService {
  mailMan = new BehaviorSubject(null);
  constructor() { }
  sendMessage(dragTag: string) {
    this.mailMan.next(dragTag);
  }
  clearMessage() {
    this.mailMan.next(null);
  }
  getMessage() {
    return this.mailMan.asObservable();
  }
}
