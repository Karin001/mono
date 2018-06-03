import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MyValidators } from '../../service/myValidators';
import { RestapiService,InOutItemsSchema } from '../../service/restapi.service';
import { ItemModifyService } from '../../service/item-modify.service';
import { SnackBarService } from '../../service/snack-bar.service';
import { ItemSelectService } from '../../service/item-select.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-in-out',
  templateUrl: './in-out.component.html',
  styleUrls: ['./in-out.component.scss']
})
export class InOutComponent implements OnInit, OnDestroy {
  selectedItems;
  form: FormGroup;
  monitor_value$: Subscription;
  monitor_valid$: Subscription;
  dir: string;
  submitDis = true;
  localQuantities;
  quantitiesAfterChange;
  warnings: string[];
  get quantity() {
    return this.form.controls['quantity'];
  };
  get valid() {
    return this.form.valid;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InOutComponent>,
    private myValidators: MyValidators,
    private restApi: RestapiService,
    private itemModify: ItemModifyService,
    private snackBar: SnackBarService,
    private itemSel: ItemSelectService,
    private fb: FormBuilder
  ) {
    this.dir = this.data.dir;
    this.creatForm();
  }

  ngOnInit() {
    this.selectedItems = this.restApi.localItemList.items.filter(item => this.data.selectedMarkings.includes(item.marking));
    this.selectedItems.forEach(item => {
      item['quantityAfterChange'] = item['qantity'];
      item['warning'] = '';
    });
    this.monitor_value$ = this.quantity.valueChanges
      .subscribe(v => {

        if (this.dir === 'in') {
          this.selectedItems.forEach(item => { item['quantityAfterChange'] = item.quantity + (this.form.controls['quantity'].value - 0); });
        } else {
          this.selectedItems.forEach(item => {
            item['quantityAfterChange'] = item.quantity - this.form.controls['quantity'].value;
            item['warning'] = item['quantityAfterChange'] < 0 ? 'over range' : '';
          });
        }

      });

    this.monitor_valid$ = this.form.statusChanges
      .subscribe(status => {
        console.log(status);
        this.submitDis = status === 'INVALID' ||
          this.selectedItems.find(item =>
            item['warning'] && item['warning'] === 'over range') ? true : false ||
          this.quantity.value - 0 === 0;
        console.log(this.submitDis, this.selectedItems.find(item =>
          item['warning'] && item['warning'] === 'over range') ? true : false, this.selectedItems);
      });
  }
  ngOnDestroy() {
    this.monitor_value$.unsubscribe();
    this.monitor_valid$.unsubscribe();
  }
  creatForm() {
    this.form = this.fb.group({
      quantity: [0, this.myValidators.quantity],
      memo: ['', this.myValidators.maxLength(50)]
    });
  }
  quantityChn(mode) {
    if (mode === 'up') {
      this.quantity.setValue(this.quantity.value - 0 + 1);
    } else {
      this.quantity.setValue(this.quantity.value <= 0 ? 0 : this.quantity.value - 1);
    }
  }
  onSubmit() {
    if (this.valid) {
      if (this.selectedItems.length === 1) {
        const inOutdataForApi = {
          [this.dir]: {
            quantity: this.form.controls['quantity'].value,
            time: new Date(),
          },
          quantity: this.selectedItems[0]['quantityAfterChange'],
          itemid: this.selectedItems[0]._id
        };

        this.restApi.in_outQantity(inOutdataForApi).subscribe(res => {
          if (res.code !== 'success') {
            this.snackBar.openSnackBar(res.code);
          } else {
            this.itemModify.doModify();
          }
        });
      } else if (this.selectedItems.length > 1) {
        const inOutdatasForApi:InOutItemsSchema = {
          [this.dir]: {
            quantity: this.form.controls['quantity'].value,
            time: new Date(),
            memo: this.form.controls['memo'].value
          },
          items: this.selectedItems.map( item  => {
            console.log(1);
            return { itemid: item._id, quantity: item['quantityAfterChange'] };
          })
        };
        this.restApi.in_outQantities(inOutdatasForApi).subscribe(res => {
          if (res.code !== 'success') {
            this.snackBar.openSnackBar(res.code);
          } else {
            this.itemModify.doModify();
          }
        });
      }
      this.dialogRef.close();
    }
  }

}
