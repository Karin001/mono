import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RestapiService } from '../../service/restapi.service';
import { ItemModifyService } from '../../service/item-modify.service';
import { SnackBarService } from '../../service/snack-bar.service';
import { ItemSelectService } from '../../service/item-select.service';
import { Subscription } from 'rxjs/Subscription';
import { markParentViewsForCheck } from '@angular/core/src/view/util';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit, OnDestroy {
  selectedItems;
  listen$: Subscription;
  constructor(
    private itemSel: ItemSelectService,
    private snackbar: SnackBarService,
    private restApi: RestapiService,
    private itemModify: ItemModifyService,
    private dialogRef: MatDialogRef<DeleteComponent>,
  ) { }

  ngOnInit() {
    this.listen$ = this.itemSel.listenSelected().filter(markings => !!markings).subscribe(markings => {
      this.selectedItems = this.restApi.localItemList.items.filter(item => markings.includes(item.marking));
    });
  }
  onSubmit(ps) {
    this.dialogRef.close();
    console.log(ps);
    if (this.selectedItems.length === 1) {
      this.restApi.deleteItem(this.selectedItems[0]._id, ps)
        .subscribe(res => {
          this.snackbar.openSnackBar(res.message);
          if (res.code === 'success') {
            this.itemModify.doModify();
          }
        }, err => {
          this.snackbar.openSnackBar('抱歉，操作失败：' + err.error.message);
          console.log(err);
          this.itemModify.doModify('err');
        });
    } else if (this.selectedItems.length > 1) {
      this.restApi.deleteItems(this.selectedItems.map(item => item._id), ps)
      .subscribe(res => {
        this.snackbar.openSnackBar(res.message);
        if (res.code === 'success') {
          this.itemModify.doModify();
        }
      }, err => {
        this.snackbar.openSnackBar('抱歉，操作失败：' + err.error.message);
        console.log(err);
        this.itemModify.doModify('err');
      });
    }

  }
  ngOnDestroy() {
    this.listen$.unsubscribe();
  }

}
