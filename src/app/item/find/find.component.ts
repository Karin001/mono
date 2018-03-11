import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AutoComplateService } from '../../service/auto-complate.service';
@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],

})
export class FindComponent implements OnInit, AfterViewInit, OnDestroy {
  name;

  options = [
    '112',
    '112',
    '112',
    '112',
    '112',
    '2213',
    '321321'
  ]
  filteredOptions: Subscription;
  showOptions;
  search = new FormControl();
  constructor(private auto: AutoComplateService) {
    this.filteredOptions = this.auto.autoComlate(this.search, this.options)
      .subscribe(val => this.showOptions = val);

  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.filteredOptions.unsubscribe();
  }
  ngAfterViewInit() {


  }

}
