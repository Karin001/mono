import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { Router, RouterModule, Routes } from '@angular/router';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { DetailComponent } from './detail/detail.component';
import { AdditemComponent } from './additem/additem.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FunctionComponent } from './function/function.component';

import { FindComponent } from './find/find.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { find } from 'rxjs/operators/find';
import { ImpItemsComponent } from './imp-items/imp-items.component';
import { UpdateComponent } from './update/update.component';
const routes: Routes = [{
  path: 'itemlist', component: ItemlistComponent,
  children: [{
    path: '', component: DetailComponent,
  }, {
    path: 'import', component: ImpItemsComponent
  }
  ]
},


];
@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
    DynamicFormModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ItemlistComponent,
    AdditemComponent,
    FunctionComponent,
    DetailComponent,
    FindComponent,
    ImpItemsComponent,
    UpdateComponent
  ],
  entryComponents: [
    AdditemComponent,
    UpdateComponent
  ],
  exports: [FindComponent]

})
export class ItemModule { }
