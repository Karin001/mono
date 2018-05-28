import { Component, OnInit, Input } from '@angular/core';
import { ItemSelectService } from '../../service/item-select.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EcomponentFormComponent } from '../../ecomponent-form/ecomponent-form/ecomponent-form.component';
import {AdditemComponent} from '../../item/additem/additem.component';
import {InOutComponent} from '../../item/in-out/in-out.component';
import { DeleteComponent } from '../../item/delete/delete.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() slimMode: Boolean;
  private _selected:Boolean;
  constructor(
    private itemSelect: ItemSelectService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.itemSelect.listenSelected().subscribe((marking: string) => {
      console.log('marking', marking);
      if(marking){
        this._selected = true;
      } else{
        this._selected =false;
      }
    });
  }
  openDialog_add() {
    const dialogRef = this.dialog.open(AdditemComponent, {
      width: '850px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialog_in_out(dir:string) {
    const dialogRef = this.dialog.open(InOutComponent, {
      width: '350px',
      panelClass:'cus-inout-cls',
      data:dir
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialog_delete() {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
