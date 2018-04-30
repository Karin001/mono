import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { RestapiService } from '../../service/restapi.service';
import { MyValidators } from '../../service/myValidators';
import { logState } from '../../state/state';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  disabled = true;
  userLogin: FormGroup;
  errorInfos = [{
    errorCode: 'min_maxLength',
    message: '允许4-16个字符'
  },
  {
    errorCode: 'eng_numChar',
    message: '允许英文、数字'
  }];

  changecs = {
    hintMode: 'hint',
    okMode: 'ok',
    alertMode: 'alert'
  };
  btnDisable$: Subscription;
  logState$: Subscription;
  constructor(
    private fb: FormBuilder,
    private restapi: RestapiService,
    private myValidators: MyValidators,
    private router: Router
  ) {
    this.creatForm();
    console.log(this.userLogin);
  }

  ngOnInit() {
    this.btnDisable$ = this.userLogin.statusChanges
      .map(v => v === 'VALID' ? false : true)
      .subscribe(v => {
        this.disabled = v;
      });
    this.logState$ = this.restapi.getLogState().subscribe(state => {
      console.log(4455);
      console.log('state', state);
      if (state === logState.login || state === logState.logged) {
        this.router.navigateByUrl('/itemlist');
      }
    });

  }
  ngOnDestroy() {
    this.btnDisable$.unsubscribe();
    this.logState$.unsubscribe();
  }




  creatForm() {

    this.userLogin = this.fb.group({
      'ID': ['', [this.myValidators.min_maxLength(4, 16), this.myValidators.eng_numChar]],
      'Password': ['', [this.myValidators.min_maxLength(6, 16), this.myValidators.eng_numChar]]
    });


  }


  onSubmit() {
    console.log(1);
    if (this.userLogin.valid) {
      console.log(3);
      this.disabled = true;
      this.restapi.logIn({
        username: this.userLogin.value['ID'],
        password: this.userLogin.value['Password']
      }, () => { this.disabled = false; });

    }


  }
}
