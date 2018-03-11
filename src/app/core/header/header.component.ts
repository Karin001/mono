import { Component, OnInit, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { Event } from '@angular/router/src/events';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModifyAvatarComponent } from '../user-fn/modify-avatar/modify-avatar.component';
import { ChangePsComponent } from '../user-fn/change-ps/change-ps.component';
import { searchMove } from '../../anims/anim';
import { RestapiService } from '../../restapi.service';
import { logState } from '../../state/state';
import { switchMap } from 'rxjs/operator/switchMap';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [searchMove]
})
export class HeaderComponent implements OnInit {
  @Output()
  sidbartoggle = new EventEmitter;

  loginBtn: Boolean = true;
  title: String = 'miku元件小屋';
  imgSrc = 'assets/sys/dummy_user.jpg';
  usermenu_open: Boolean = true;
  usermenu_able: Boolean = false;
  state = 'out';
  options = [
    '2',
    '3'
  ];
  constructor(
    private restApi: RestapiService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.restApi.logIn({ username: '', password: '' });
    this.restApi.getLogState()
      .do(state => {
        if (state === logState.logout) {
          this.imgSrc = 'assets/sys/dummy_user.jpg';
          this.loginBtn = true;
          this.usermenu_able = false;

        }
      })
      .filter(state => {
        return state === logState.login || state === logState.logged;
      })
      .do(state => {
        this.loginBtn = false;
        this.usermenu_able = true;
      })
      .mergeMap(state => this.restApi.subscribeAvatar())
      .subscribe(v => { this.imgSrc = v; });

    this.restApi.getAvatarFreshState()
      .filter(state => state === true)
      .switchMap(state => this.restApi.subscribeAvatar())
      .subscribe(v => { this.imgSrc = v; } );
  }

  onclick() {
    this.sidbartoggle.emit();
  }
  menuToggle() {
    this.usermenu_open = this.usermenu_open ? false : true;
  }
  onFocus() {
    this.state = 'in';
    console.log(1);
  }
  onBlur() {
    this.state = 'out';
  }
  logOut() {
    this.restApi.logOut();
  }
  openDialog_ava() {
    const dialogRef = this.dialog.open(ModifyAvatarComponent, {
      width: '600px',
      height: '500px',
      
    });
    console.log("111111111");
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialog_ps() {
    const dialogRef = this.dialog.open(ChangePsComponent, {
      width: '300px',


    });
    console.log("111111111");
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
