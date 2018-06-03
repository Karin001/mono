import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-form/container/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../dynamic-form/interface/fieldConfig';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MyValidators } from '../../service/myValidators';
import { RestapiService } from '../../service/restapi.service';
import { ItemModifyService } from '../../service/item-modify.service';
import { SnackBarService } from '../../service/snack-bar.service';
import { ItemFormatFactoryService } from '../../service/item-format-factory.service';
import { ItemFormatDataService } from '../../service/item-format-data.service';
import { concat } from 'rxjs/operator/concat';
import 'rxjs/add/operator/concat';
interface FormsVal {

  childType?: String;
  footprint?: String;
  marking?: String;
  customtag?: string;
  quantity?: Number;
  unit?: String;
  value?: String;
  precise?: String;
  volt?: Number;

}
interface FormsData {
  checkboxVal: string[];
  formVal: FormsVal;
  valid: Boolean;
}
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, AfterViewInit {
  @ViewChild('dynamicForm')
  dynamicForm: DynamicFormComponent;
  bomTypes;
  formFieldConfigs;
  formsPool: { [formType: string]: FieldConfig[] };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateComponent>,
    private myValidators: MyValidators,
    private restApi: RestapiService,
    private itemModify: ItemModifyService,
    private snackBar: SnackBarService,
    private itemFac: ItemFormatFactoryService,
    private itemFormatData: ItemFormatDataService
  ) {
    this.itemFac.creatDynamicFormConfig();
    this.bomTypes = Object.keys(this.itemFormatData.itemTypes);
    this.formsPool = this.itemFac.itemDynamicConfigs;
    if (this.data['option'] === 'value') {
      if (this.itemFormatData.unitTypes[this.data['name']]) {
        this.itemFac.baseConfigSets.unit.options = this.itemFormatData.unitTypes[this.data['name']] || [];
        this.formFieldConfigs = [
          this.itemFac.baseConfigSets['value'],
          this.itemFac.baseConfigSets['unit'],
          this.itemFac.baseConfigSets['submit']
        ]
      } else {
        this.formFieldConfigs = [
          this.itemFac.baseConfigSets['value'],
          this.itemFac.baseConfigSets['submit']
        ]
      }


    } else if (this.data['option'] === 'childType') {
      this.itemFac.baseConfigSets.childType.options = this.itemFormatData.itemTypes[this.data['name']] || [];
      this.formFieldConfigs = [
        this.itemFac.baseConfigSets['childType'],
        this.itemFac.baseConfigSets['customtag'],
        this.itemFac.baseConfigSets['submit']
      ]
    } else {
      this.formFieldConfigs = [
        this.itemFac.baseConfigSets[this.data['option']],
        this.itemFac.baseConfigSets['submit']
      ];
    }

  }

  ngOnInit() {
    console.log(this.data);
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
    const updateOptions = {};

    for (const key in ev.formVal) {
      if (ev.formVal.hasOwnProperty(key)) {
        const element = ev.formVal[key];
        updateOptions['item_' + key] = element;
      }
    }
    updateOptions['item_id'] = this.restApi.localItemList.items
      .find(item => item.marking === this.data.marking)._id;
    if (updateOptions['item_customtag']) {
      this.itemFormatData.itemTypes[this.data['name']].pop();
      this.itemFormatData.itemTypes[this.data['name']].push(updateOptions['item_customtag']);
      this.itemFormatData.itemTypes[this.data['name']].push('使用自定义子类');
      updateOptions['item_childType'] = updateOptions['item_customtag'];
    }
    console.log('updateOptions', updateOptions);
    this.itemModify.doModify('loading');
    this.restApi.updateProperty(updateOptions)
      .concat(this.restApi.updateTypes({
        baseSets: this.itemFormatData.baseSets,
        itemTypes: this.itemFormatData.itemTypes,
        unitTypes: this.itemFormatData.unitTypes
      }))
      .subscribe(res => {
        console.log(res);
        if (res.code === 'success') {
          this.snackBar.openSnackBar('sucess');
          this.itemModify.doModify();

        }
      });
    this.dialogRef.close();
  }

}
