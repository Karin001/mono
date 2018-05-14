import { Component, OnInit, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { Event } from '@angular/router/src/events';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModifyAvatarComponent } from '../user-fn/modify-avatar/modify-avatar.component';
import { ChangePsComponent } from '../user-fn/change-ps/change-ps.component';

import { RestapiService } from '../../service/restapi.service';
import { logState } from '../../state/state';
import { switchMap } from 'rxjs/operator/switchMap';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  canShowLoginBox: Boolean = true;
  canShowUsermenu: Boolean = false;
  usermenuIsOpened: Boolean = true;
  title: String = '某某人的元件小屋';
  userAvatarImgSrc = 'assets/sys/dummy_user.jpg';


  constructor(
    private restApi: RestapiService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.restApi.getLogState()
      .do(state => {
        if (state === logState.logout) {
          this.userAvatarImgSrc = 'assets/sys/dummy_user.jpg';
          this.title = '某某人的元件小屋';
          this.canShowLoginBox = true;
          this.canShowUsermenu = false;
        }
      })
      .filter(state => {
        console.log('logstate', state);
        return state === logState.login || state === logState.logged;

      })
      .do(state => {
        this.title = `${this.restApi.localItemList.username}的元件小屋`
        this.canShowLoginBox = false;
        this.canShowUsermenu = true;
      })
      .mergeMap(state => this.restApi.subscribeAvatar())
      .subscribe(v => { this.userAvatarImgSrc = v; });

    this.restApi.getAvatarFreshState()
      .filter(state => state === true)
      .switchMap(state => this.restApi.subscribeAvatar())
      .subscribe(v => { this.userAvatarImgSrc = v; });
  }


  userMenuToggle() {
    this.usermenuIsOpened = this.usermenuIsOpened ? false : true;
  }
  logOut() {
    this.restApi.localItemList = null;
    this.restApi.logOut();
  }
  openDialog_ava() {
    const dialogRef = this.dialog.open(ModifyAvatarComponent, {
      width: '600px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      // do something after close
    });
  }
  openDialog_ps() {
    const dialogRef = this.dialog.open(ChangePsComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      // do something after close
    });
  }
}
