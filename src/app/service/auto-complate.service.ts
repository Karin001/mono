import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AutoComplateService {

  constructor() { }
  filter(val: string, options: string[]): string[] {
    return options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0 && val !== '');
  }
  autoComlate(fc: FormControl, options: string[]): Observable<string[]> {
    return fc.valueChanges
      .startWith('')
      .map(val => this.filter(val, options));
  }
}
