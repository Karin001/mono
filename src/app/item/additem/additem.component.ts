import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FieldConfig } from '../../dynamic-form/interface/fieldConfig';
import { DynamicFormComponent } from '../../dynamic-form/container/dynamic-form/dynamic-form.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MyValidators } from '../../service/myValidators';
import { ItemFormatDataService } from '../../service/item-format-data.service';
import { Ename } from '../../ecomponent-form/eTypeDef/eTypeDef';
import { RestapiService } from '../../service/restapi.service';
import { ItemModifyService } from '../../service/item-modify.service';
import { SnackBarService } from '../../service/snack-bar.service';
import { ItemFormatFactoryService } from '../../service/item-format-factory.service';
import {concat} from 'rxjs/operator/concat';
import 'rxjs/add/operator/concat';
interface FormsVal {
  name?: string;
  usevalue?: string;
  useprecise?: string;
  usevolt?: string;
  childType: String;
  brand?:string;
  footprint: String;
  marking: String;
  customtag?: string;
  quantity: Number;
  unit?: String;
  value?: String;
  precise?: String;
  volt?: Number;
  description?: String;
}
interface FormsData {
  checkboxVal: string[];
  formVal: FormsVal;
  valid: Boolean;
}
@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit, AfterViewInit {
  @ViewChild('dynamicForm')
  dynamicForm: DynamicFormComponent;
  bomTypes;
  selectedBomType = 'RES';
  formsPool: { [formType: string]: FieldConfig[] };


  formFieldConfigs;

  constructor(
    public dialogRef: MatDialogRef<AdditemComponent>,
    private myValidators: MyValidators,
    private restApi: RestapiService,
    private itemModify: ItemModifyService,
    private snackBar: SnackBarService,
    private itemFac: ItemFormatFactoryService,
    private itemFormatData: ItemFormatDataService
  ) {

    this.itemFac.creatDynamicFormConfig();
    this.bomTypes = Object.keys(this.itemFormatData.baseSets);
    console.log('base2',this.itemFormatData.baseSets);
    console.log('bomtypes',this.itemFormatData.itemTypes);
    this.formsPool = this.itemFac.itemDynamicConfigs;
  }

  ngOnInit() {

    this.formFieldConfigs = this.formsPool['RES'];

    console.log('formConfigs', this.itemFac.itemDynamicConfigs);
  }
  ngAfterViewInit() {
    let previousValid = this.dynamicForm.valid;
    this.dynamicForm.changes
      .subscribe(val => {
        if (previousValid !== this.dynamicForm.valid) {
          previousValid = this.dynamicForm.valid;
          this.dynamicForm.setDisabled('submit', !previousValid);
        }
      });
    setTimeout(() => {
      this.dynamicForm.setDisabled('submit', true);
    });

  }
  onSubmit(ev: FormsData) {
    console.log('valid', this.dynamicForm.valid);
    this.dialogRef.close();
    if (this.dynamicForm.valid && this.selectedBomType === 'ADD NEW TYPE') {
      this.itemFormatData.baseSets[ev.formVal.name] = [];
      this.itemFormatData.baseSets[ev.formVal.name].push('marking', 'childType', 'footprint', 'quantity', 'description', 'customtag','brand',);
      if (ev.formVal.usevalue === '需要') {
        this.itemFormatData.baseSets[ev.formVal.name].push('value');
      }
      if (ev.formVal.usevolt === '需要') {
        this.itemFormatData.baseSets[ev.formVal.name].push('volt');
      }
      if (ev.formVal.useprecise === '需要') {
        this.itemFormatData.baseSets[ev.formVal.name].push('precise');
      }
      this.itemFormatData.baseSets[ev.formVal.name].push('submit');
      this.itemFormatData.itemTypes[ev.formVal.name] = ['无', '使用自定义子类'];
      return;
    }
    console.log(ev);
    let _quantity, marking, setUpTime, childType, footprint, description,brand, _property: any;
    setUpTime = new Date();
    _property = {};
    for (const key in ev.formVal) {
      if (ev.formVal.hasOwnProperty(key)) {
        if (key === 'marking') {
          marking = ev.formVal.marking;
        } else if (key === 'quantity') {
          _quantity = ev.formVal.quantity;
        } else if (key === 'childType') {
          if (ev.formVal.childType !== '使用自定义子类') {
            childType = ev.formVal.childType;
          }
        } else if (key === 'customtag') {
          if (ev.formVal.childType === '使用自定义子类') {
            childType = ev.formVal.customtag;
            this.itemFormatData.itemTypes[this.selectedBomType].pop();
            this.itemFormatData.itemTypes[this.selectedBomType].push(childType);
            this.itemFormatData.itemTypes[this.selectedBomType].push('使用自定义子类');
          }

        } else if (key === 'footprint') {
          footprint = ev.formVal.footprint;
        } else if (key === 'description') {
          description = ev.formVal.description || '该器件未添加描述';
          console.log('description', description);
        } else if(key === 'brand') {
          brand = ev.formVal.brand || '无';
        }else {
          _property[key] =  ev.formVal[key];
        }
      }
    }


    if (this.restApi.localItemList && this.restApi.localItemList['items']) {
      const item = {
        name: this.selectedBomType,
        quantity: _quantity,
        marking: marking,
        setUpTime: setUpTime,
        footprint: footprint,
        childType: childType,
        description: description,
        brand:brand,
        property: _property
      };

      this.restApi.addItem( item )
        .concat(this.restApi.updateTypes({
        baseSets:this.itemFormatData.baseSets,
        itemTypes:this.itemFormatData.itemTypes,
        unitTypes:this.itemFormatData.unitTypes
        }))
        .subscribe(res => {
          console.log(res);
          if (res.code === 'success') {

            this.snackBar.openSnackBar('数据已同步');
            this.itemModify.doModify();
          } else {
            this.snackBar.openSnackBar('数据同步失败');
            this.itemModify.doModify();
          }
        });
    } else {
      this.restApi.addFirstItem({
        name: this.selectedBomType,
        quantity: _quantity,
        marking: marking,
        childType: childType,
        setUpTime: setUpTime,
        description: description,
        footprint: footprint,
        brand:brand,
        property: _property
      })
      .concat(this.restApi.updateTypes({
        baseSets:this.itemFormatData.baseSets,
        itemTypes:this.itemFormatData.itemTypes,
        unitTypes:this.itemFormatData.unitTypes
        }))
        .subscribe(res => {
          console.log(res);
          if (res.code === 'success') {
            this.snackBar.openSnackBar('数据已更新');
            this.itemModify.doModify();

          } else {
            this.snackBar.openSnackBar('数据同步失败');
          }
        });
    }

  }
  changeForm(formType) {
    this.formFieldConfigs = this.formsPool[formType];
    setTimeout(() => {
      this.dynamicForm.setDisabled('submit', true);
    });
  }

}
