import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule, Routes } from '@angular/router';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { AdditemComponent } from './additem/additem.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FunctionComponent } from './function/function.component';
import { DetailComponent } from './detail/detail.component';
import { FindComponent } from './find/find.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatDialogModule} from '@angular/material';
const routes: Routes = [
  { path: 'itemlist', component: ItemlistComponent,
  children: [
    {path: ':number', component: DetailComponent}
  ]

}

];
@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ItemlistComponent, AdditemComponent, FunctionComponent, DetailComponent, FindComponent],
  entryComponents: [AdditemComponent],

})
export class ItemModule { }
