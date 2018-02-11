import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { RestapiService } from '../../restapi.service';
import {myValidators} from '../../my-validators/myValidators';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


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

  constructor(
    private fb: FormBuilder,
    private restapi: RestapiService
  ) {
    this.creatForm();
    console.log(this.userLogin);
  }

  ngOnInit() {


  }




  creatForm() {

      this.userLogin = this.fb.group({
        'ID': ['', [myValidators.min_maxLength(4,16),myValidators.eng_numChar]],
        'Password': ['', [myValidators.min_maxLength(6,16),myValidators.eng_numChar]]
      });


  }


  onSubmit() {
      this.restapi.logIn({
        username: this.userLogin.value['ID'],
        password: this.userLogin.value['Password']
      }).subscribe((data) => {
        if (data['code'] === 'logged') {

        } else if (data['code'] === 'mongo_err') {

        } else if (data['code'] === 'invalid_user') {

        } else if (data['code'] === 'invalid_password') {

        } else if (data['code'] === 'success') {

        } else {

        }
      });
      //验证正确 跳转

  }
}
