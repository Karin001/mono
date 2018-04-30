import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoComplateService } from './auto-complate.service';
import { UsernameCheckService } from './username-check.service';
import { MyValidators } from './myValidators';
import {RestapiService} from './restapi.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AutoComplateService, UsernameCheckService, MyValidators, RestapiService]
})
export class ServiceModule { }
