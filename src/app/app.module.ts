import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { Router, RouterModule, Routes } from '@angular/router';
import {ItemModule} from './item/item.module';
import { ItemlistComponent } from './item/itemlist/itemlist.component';
import { DetailComponent } from './item/detail/detail.component'
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login/login.component';
import { RestapiService } from './restapi.service';
import {LocaldataService} from './localdata.service';
const routes: Routes = [
  { path: '', redirectTo: '/itemlist', pathMatch: 'full' },
  { path: 'itemlist', component: ItemlistComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' }




];
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(routes),
    SharedModule,
    LoginModule,
    ItemModule,
  ],
  providers: [RestapiService, LocaldataService],
  bootstrap: [AppComponent]

})
export class AppModule { }
