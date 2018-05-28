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
  selectedItem;
  listen$:Subscription;
  constructor(
    private itemSel: ItemSelectService,
    private snackbar: SnackBarService,
    private restApi: RestapiService,
    private itemModify: ItemModifyService,
    private dialogRef: MatDialogRef<DeleteComponent>,
  ) { }

  ngOnInit() {
    this.listen$ = this.itemSel.listenSelected().filter(marking => !!marking).subscribe(marking => {
      this.selectedItem = this.restApi.localItemList.items.find(item=> item.marking === marking);
    })
  }
  onSubmit(ps) {
    this.dialogRef.close();
    console.log(ps);
    this.restApi.deleteItem(this.selectedItem._id, ps)
    .subscribe(res=> {
      this.snackbar.openSnackBar(res.message);
      if(res.code === 'success') {
        this.itemModify.doModify();
      }
    })
  }
  ngOnDestroy() {
    this.listen$.unsubscribe();
  }

}
