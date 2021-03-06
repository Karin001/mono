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
import { SignupComponent} from './login/signup/signup.component';
import { RestapiService } from './restapi.service';
import {LocaldataService} from './localdata.service';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { DuplicateCheckDirective } from './directive/duplicate-check/duplicate-check.directive';

const routes: Routes = [
  { path: '', redirectTo: '/itemlist', pathMatch: 'full' },
  { path: 'itemlist', component: ItemlistComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' }





];
@NgModule({
  declarations: [
    AppComponent,
    DuplicateCheckDirective,


  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(routes),
    SharedModule,
    LoginModule,
    ItemModule,
    DragAndDropModule.forRoot()
  ],
  providers: [RestapiService, LocaldataService],
  bootstrap: [AppComponent]

})
export class AppModule { }
