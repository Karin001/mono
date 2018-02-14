import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { searchMove } from '../../anims/anim';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operator/startWith';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],

})
export class FindComponent implements OnInit, AfterViewInit {
  name;

  options = [
    '112',
    '2213',
    '321321'
  ]
  filteredOptions;
  showOptions;
  search = new FormControl();
  constructor() {
    this.filteredOptions = this.search.valueChanges
      .startWith('')
      .map(val =>  this.filter(val))
      .subscribe(val => {
          this.showOptions = val;
      });

  }
  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0 && val !== '');
  }

  ngOnInit() {
  }
  ngAfterViewInit() {


  }

}
