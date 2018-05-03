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
interface IteminoutSchema {
  quantity: number;
  time: Date;
}
interface ItemSchema {
  name: string;
  marking: string;
  quantity: number;
  description: string;
  footprint: string;
  childType: string;
  property?: string[];
  in?: IteminoutSchema[];
  out?: IteminoutSchema[];
  project?: string[];
  setUpTime: Date;
  id?: string;
}


interface ItemListSchema {
  username: string;
  items: ItemSchema[];
  itemTypes?:any;
  _id: string;
}
interface ResponseType {
  message: any;
  fb: any | ItemListSchema;
  err: Object;
  code: string;
}
@Injectable()
export class RestapiService {
  logged = new BehaviorSubject<number>(null);
  avatarFreshed = new BehaviorSubject<boolean>(null);
  psFreshed = new BehaviorSubject<boolean>(null);
  localItemList: ItemListSchema;
  constructor(
    private hc: HttpClient,
    private router: Router
  ) {

  }
  addItem(item: ItemSchema): Observable<ResponseType> {
    return this.hc.post('/api/itemlist/add', item) as Observable<ResponseType>;
  }
  addFirstItem(item: ItemSchema): Observable<ResponseType> {
    return this.hc.post('/api/itemlist/addFirst', item) as Observable<ResponseType>;
  }
  updateTypes(item:any) {
    return this.hc.post('/api/itemlist/updateTypes',item) as Observable<ResponseType>;
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
        } else if (resp.code === 'invalid_user') {
          this.logged.next(logState.invalid_user_ps);
        } else if (resp.code === 'type_err') {
          this.logged.next(logState.invalid_pstype);
        } else if (resp.code === 'invalid_password') {
          this.logged.next(logState.invalid_user_ps);
        }
        this.router.navigateByUrl('/login');
        callback();
        throw (e);
      })
      .subscribe(
      (resp: LoginRespInfo) => {
        if (resp.code === 'logged') {
          this.logged.next(logState.logged);
          this.router.navigateByUrl('/itemlist');
        } else if (resp.code === 'success') {
          this.logged.next(logState.login);
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
          this.logged.next(logState.logout);
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
