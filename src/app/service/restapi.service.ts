import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  SignUpInfo, SignUpRespInfo, LoginInfo, LoginRespInfo,
  LogOutRespInfo, GeneralResp, PicInfo, RestPSInfo
} from '../interface/userType';
import { logState } from '../state/state';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/retry';
import { SnackBarService } from './snack-bar.service';
import { ItemModifyService } from './item-modify.service';
interface IteminoutSchema {
  quantity: number;
  time: Date;
  memo: string;
}
interface InOutSchema {
  in?: IteminoutSchema;
  out?: IteminoutSchema;
  itemid: string;
  quantity: number;
}
interface InOutItemSchema {
  itemid: string;
  quantity: number;
}
export interface InOutItemsSchema {
  in?: IteminoutSchema;
  out?: IteminoutSchema;
  items: InOutItemSchema[];
}
export interface ItemSchema {
  name: string;
  marking: string;
  quantity: number;
  description?: string;
  footprint: string;
  brand?: string;
  childType?: string;
  property?: any;
  in?: IteminoutSchema[];
  out?: IteminoutSchema[];
  project?: string[];
  setUpTime: Date;
  _id?: string;
}


interface ItemListSchema {
  username: string;
  items: ItemSchema[];
  itemTypes?: any;
  _id: string;
}
interface ResponseType {
  message: any;
  fb: any | ItemListSchema;
  err: Object;
  code: string;
}
interface FindOption {
  selected: string[];
  bigname?: string;
  childType?: string;
  footprint?: string;
  value?: string;
  volt?: string;
  precise?: string;
}
@Injectable()
export class RestapiService {
  logged = new BehaviorSubject<number>(null);
  avatarFreshed = new BehaviorSubject<boolean>(null);
  psFreshed = new BehaviorSubject<boolean>(null);
  username;
  localItemList: ItemListSchema;
  constructor(
    private hc: HttpClient,
    private router: Router,
    private snackBarService: SnackBarService,
    private itemModify: ItemModifyService
  ) {

  }
  localFind(options: FindOption) {
    console.log('000');
    if (this.localItemList && this.localItemList.items) {
      console.log('111');
      return this.localItemList.items.filter(items => {
        let sumBoolean = true;
        if (items.name !== options['name']) {
          console.log('222', items.name, options['name']);
          return false;
        }
        options.selected.forEach(element => {
          if (element === 'value') {
            const itemValue = (items.property['value'] || '') + '' + (items.property['unit'] || '');
            sumBoolean = sumBoolean && itemValue === options[element];
          } else if (element === 'precise' || element === 'volt') {
            sumBoolean = sumBoolean && items.property[element] && items.property[element] === options[element];
          } else {
            sumBoolean = sumBoolean && items[element] && (items[element] === options[element]);
            console.log(element, options[element], items[element]);
          }

        });
        return sumBoolean;
      }
      )
    }

  }
  addItem(item: ItemSchema): Observable<ResponseType> {
    this.localItemList.items.push(item);
    console.log(this.localItemList.items.map(item => item.marking));
    this.itemModify.doModify('localModified');
    return this.hc.post('/api/itemlist/add', item) as Observable<ResponseType>;
  }
  addItems(items: ItemSchema[]): Observable<ResponseType> {
    return this.hc.post('/api/itemlist/addItems', items) as Observable<ResponseType>;
  }
  addFirstItem(item: ItemSchema): Observable<ResponseType> {

    return this.hc.post('/api/itemlist/addFirst', item) as Observable<ResponseType>;
  }
  in_outQantity(inOrOut: InOutSchema) {
    this.itemModify.doModify('loading');
    return this.hc.post('api/itemlist/quantity', inOrOut) as Observable<ResponseType>;
  }
  in_outQantities(inOrOut: InOutItemsSchema) {
    this.itemModify.doModify('loading');
    return this.hc.post('api/itemlist/quantities', inOrOut) as Observable<ResponseType>;
  }
  updateTypes(item: any) {
    return this.hc.post('/api/itemlist/updateTypes', item) as Observable<ResponseType>;
  }

  updateProperty(property: any) {
    return this.hc.post('/api/itemlist/updateProperty', property) as Observable<ResponseType>;
  }
  deleteItem(itemid, password) {
    return this.hc.post('/api/psCheck', { password })
      //   .do(x => { this.itemModify.doModify('loading'); })
      .concat(this.hc.post('/api/itemlist/delete', { itemid })) as Observable<ResponseType>;
  }
  deleteItems(itemids, password) {
    return this.hc.post('/api/psCheck', { password })
      //   .do(x => { this.itemModify.doModify('loading'); })
      .concat(this.hc.post('/api/itemlist/deleteItems', { itemids })) as Observable<ResponseType>;
  }
  streamMock_allItem() {
    return this.hc.get(`assets/data/itemlist.json`);
  }
  streamMock_itemDetail() {
    return this.hc.get(`assets/data/itemdetail.json`);
  }
  stream_allItem(): Observable<ResponseType> {
    return this.hc.get('/api/itemlist') as Observable<ResponseType>;
  }
  getLogState(): Observable<number> {
    return this.logged.asObservable();
  }
  getAvatarFreshState() {
    return this.avatarFreshed.asObservable();
  }
  getPsFreshState() {
    return this.psFreshed.asObservable();
  }
  logIn(userinfo: LoginInfo, callback = () => { }) {
    return this.hc.post('api/logIn', userinfo)
      .catch((e: HttpErrorResponse) => {
        const resp = e.error as LoginRespInfo;
        if (resp.code === 'mongo_err') {
          this.logged.next(logState.mongo_err);
          this.snackBarService.openSnackBar('数据库错误');
        } else if (resp.code === 'invalid_user') {
          this.logged.next(logState.invalid_user_ps);
          this.snackBarService.openSnackBar('用户名或密码错误');
        } else if (resp.code === 'type_err') {
          this.logged.next(logState.invalid_pstype);
        } else if (resp.code === 'invalid_password') {
          this.logged.next(logState.invalid_user_ps);
          this.snackBarService.openSnackBar('用户名或密码错误');
        }
        this.router.navigateByUrl('/login');
        callback();
        throw (e);
      })
      .subscribe(
      (resp: LoginRespInfo) => {
        if (resp.code === 'logged') {

          this.username = resp.message;
          console.log('username', this.username);
          this.logged.next(logState.logged);
          this.router.navigateByUrl('/itemlist');
        } else if (resp.code === 'success') {
          this.username = userinfo.username;
          this.logged.next(logState.login);
          this.snackBarService.openSnackBar('登录成功');
          this.router.navigateByUrl('/itemlist');
        } else {
          console.log('没考虑到的状态');
        }
        callback();
      }

      );
  }
  subscribeAvatar() {
    return this.hc.get('api/userAvatar')
      .catch((e: HttpErrorResponse) => {
        const resp = e.error as LoginRespInfo;
        if (resp.code === 'mongo_err') {
          this.logged.next(logState.mongo_err);
        } else if (resp.code === 'invalid_user') {
          this.logged.next(logState.invalid_user_ps);
        }
        throw (e);
      })
      .map(
      (resp: LoginRespInfo) => {
        if (resp.code === 'success') {
          return resp.message as string;
        } else {
          return null;
        }
      },
      err => { console.log('getAvatar subscribe err'); }
      );

  }
  getAvatar(callback: Function) {
    return this.hc.get('api/userAvatar')
      .catch((e: HttpErrorResponse) => {
        const resp = e.error as LoginRespInfo;
        if (resp.code === 'mongo_err') {
          this.logged.next(logState.mongo_err);
        } else if (resp.code === 'invalid_user') {
          this.logged.next(logState.invalid_user_ps);
        }
        throw (e);
      })
      .subscribe(
      (resp: LoginRespInfo) => {
        if (resp.code === 'success') {
          callback(resp.message);
        }
      },
      err => { console.log('getAvatar subscribe err'); }
      );

  }
  logOut() {
    return this.hc.post('api/logOut', {})
      .subscribe(
      (resp: LogOutRespInfo) => {
        if (resp.code === 'session_err') {
          this.logged.next(logState.session_err);
        } else if (resp.code === 'success') {
          this.localItemList = null;
          this.logged.next(logState.logout);
          console.log(this.localItemList);
          this.router.navigateByUrl('/login');
        } else {
          console.log('没考虑到的状态');
        }
      }
      );
  }
  signUp(userinfo: SignUpInfo, callback = () => { }) {
    return this.hc.post('api/signUp', userinfo)
      .subscribe((resp: SignUpRespInfo) => {
        if (resp.code === 'mongo_err') {
          console.log(resp.message);
        } else if (resp.code === 'success') {
          console.log(resp.message);
          this.router.navigateByUrl('/login');
        } else {

        }
        callback();
      });
  }
  changeAvatarPic(picInfo: PicInfo, successCall: Function, unsuccessCall: Function) {
    this.hc.post('api/changeAvatar', picInfo)
      .subscribe((resp: GeneralResp) => {
        if (resp.code === 'mongo_err') {
          console.log(resp.message);
          unsuccessCall(resp.code);
        } else if (resp.code === 'success') {
          console.log(resp.message);
          this.avatarFreshed.next(true);
          successCall();
        } else {
          return;
        }
      });
  }
  changePs(psInfo: RestPSInfo, successCall: Function, unsuccessCall: Function) {
    return this.hc.post('api/restPS', psInfo)
      .take(1)
      .catch((e: HttpErrorResponse) => {
        const resp = e.error as GeneralResp;
        if (resp.code === 'mongo_err') {
          console.log(resp.message);
        } else if (resp.code === 'ps_err') {
          unsuccessCall();
          console.log(resp.message);
        }
        throw (e);
      })
      .subscribe(
      (resp: GeneralResp) => {
        if (resp.code === 'success') {
          console.log(resp);
          successCall();
        } else {
          console.log(resp);
          console.log('没考虑到的状态');
        }
      }
      );
  }

}
