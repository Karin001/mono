import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { RestapiService } from '../../service/restapi.service';
import { ItemModifyService } from '../../service/item-modify.service';
import { AutoComplateService } from '../../service/auto-complate.service';
@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],

})
export class FindComponent implements OnInit, AfterViewInit, OnDestroy {
  name;

  options = [

  ]
  filteredOptions: Subscription;
  showOptions;
  search = new FormControl();
  constructor(
    private auto: AutoComplateService,
    private restapi: RestapiService,
    private itemModify: ItemModifyService
  ) {

    this.itemModify.getItemUpdate().filter(v => v === 'complate').subscribe(v => {

      this.options = this.restapi.localItemList.items.map(item => item.marking);
      console.log('options', this.options);
      if (this.filteredOptions) {
        this.filteredOptions.unsubscribe();
      }

      this.filteredOptions = this.auto.autoComlate(this.search, this.options)
        .subscribe(val => this.showOptions = val);
    });





  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.filteredOptions.unsubscribe();
  }
  onSearch(){

    let result = [];
    if(!this.restapi.localItemList || !this.restapi.localItemList.items){
      result = [];
    } else {
      result = this.restapi.localItemList.items
      .filter(item => item.marking === this.search.value);
      console.log(result);
    }
    console.log('result',result);
    this.itemModify.doSearch(result);
  }
  onOver(){
    this.itemModify.searchOver();
  }
  ngAfterViewInit() {


  }

}
