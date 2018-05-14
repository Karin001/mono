import { Component, OnInit, Inject } from '@angular/core';
import { FieldConfig } from '../../dynamic-form/interface/fieldConfig';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MyValidators } from '../../service/myValidators';
import { RestapiService } from '../../service/restapi.service';
import { ItemModifyService } from '../../service/item-modify.service';
import { SnackBarService } from '../../service/snack-bar.service';
import { ItemFormatFactoryService } from '../../service/item-format-factory.service';
import { ItemFormatDataService } from '../../service/item-format-data.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
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
    this.formFieldConfigs = this.formsPool[this.data['name']];
  }

  ngOnInit() {
    console.log(this.data);
  }


}
