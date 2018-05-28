import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MyValidators } from '../../service/myValidators';
import { RestapiService } from '../../service/restapi.service';
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
  selectedItem;
  form: FormGroup;
  monitor_value$: Subscription;
  monitor_valid$: Subscription;
  dir: string;
  submitDis = false;
  localQuantity = 1000;
  quantityAfterChange;
  warning: string;
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
    this.dir = this.data;
    this.creatForm();
  }

  ngOnInit() {
    this.itemSel.listenSelected().filter(marking => !!marking).subscribe(marking => {
      this.selectedItem = this.restApi.localItemList.items.find(item => item.marking===marking);
      this.localQuantity = this.selectedItem.quantity;
         
    })
    this.monitor_value$ = this.quantity.valueChanges
      .subscribe(v => {

        if (this.dir === 'in') {
          this.quantityAfterChange = this.localQuantity  + (this.form.controls['quantity'].value-0);
        } else {
          this.quantityAfterChange = this.localQuantity - this.form.controls['quantity'].value;
         
          this.warning = this.quantityAfterChange<0? "over range!":'';
        }  
        
      })

    this.monitor_valid$ = this.form.statusChanges
      .subscribe(status => {
        console.log(status);
        this.submitDis = status === 'VALID'  && this.warning!=='over range!' ? false : true;
        console.log(this.submitDis);
      })
  }
  ngOnDestroy() {
    this.monitor_value$.unsubscribe();
    this.monitor_valid$.unsubscribe();
  }
  creatForm() {
    this.form = this.fb.group({
      quantity: [0, this.myValidators.quantity]
    })
  }
  quantityChn(mode) {
    if (mode === 'up') {
      this.quantity.setValue(this.quantity.value - 0 + 1);
    } else {
      this.quantity.setValue(this.quantity.value <= 0 ? 0 : this.quantity.value - 1);
    }
  }
  onSubmit() {
    if(this.valid) {
      const inOutdataForApi = {
        [this.dir]: {
          quantity:this.form.controls['quantity'].value,
          time:new Date(),
        },
        quantity:this.quantityAfterChange,
        itemid:this.selectedItem._id
      }
      this.dialogRef.close();
      this.restApi.in_outQantity(inOutdataForApi).subscribe(res => {
        if(res.code !== 'success') {
          this.snackBar.openSnackBar(res.code);
        } else {
          this.itemModify.doModify();
        }
      })
    }
  }

}
