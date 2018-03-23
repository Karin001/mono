import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EcomponentFormComponent } from '../../ecomponent-form/ecomponent-form/ecomponent-form.component';
import { AdditemComponent } from '../additem/additem.component';
@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.scss']
})
export class FunctionComponent implements OnInit {
  @Input() number;
  number_once;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }
  openDialog() {
    const dialogRef = this.dialog.open(AdditemComponent, {
      width: '850px',


    });
    console.log("111111111");
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
