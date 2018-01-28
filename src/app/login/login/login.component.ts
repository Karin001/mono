import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { forbiddenWordValidator } from '../../utils/custom-validator';
import { RestapiService } from '../../restapi.service'
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable'


class ErrorQuery {
  ID: string;
  PW: string;
  EM: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('fome1') btn_submit;
  mode = 'userLogin';
  switch:FormGroup;
  userLogin: FormGroup;
  userRegister: FormGroup;
  haveSubmit = false;
  errorQuery: ErrorQuery = {
    ID: '',
    PW: '',
    EM: ''
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
  ngAfterViewInit() {
    console.log('view');


  }

  register() {
    this.mode = 'userRegister';
    this.creatForm();
    console.log(this.userRegister);
  }
  login() {
    this.mode = 'userLogin';

    this.creatForm();
  }
  creatForm() {
    if (this.mode === 'userLogin') {

      this.switch = this.fb.group({
        'ID': ['', [Validators.minLength(4), Validators.maxLength(20), Validators.required, forbiddenWordValidator(/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/)]],
        'Password': ['', [Validators.minLength(6),Validators.maxLength(20), Validators.required, forbiddenWordValidator(/^[A-Za-z0-9]*$/)]]
      });


    } else {
      this.switch = this.fb.group({
        'ID': ['', [Validators.minLength(2), Validators.required, forbiddenWordValidator(/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/)]],
        'Email': ['', [Validators.required, Validators.maxLength(20),forbiddenWordValidator(/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/)]],
        'Password': ['', [Validators.minLength(6), Validators.required, forbiddenWordValidator(/^[A-Za-z0-9]*$/)]]
      });
    }
    const fcID = this.switch.get('ID');
    const fcPW = this.switch.get('Password');
    this.dynamicErrCheck(fcID, 'ID');
    this.dynamicErrCheck(fcPW, 'PW');

  }
  statusCheck(): Boolean{
    return this.switch.status === 'VALID';
  }
  staticErrCheck(fc: AbstractControl, path: string, ) {


    if (fc.hasError('required')) {
      this.errorQuery[path] = '你得写点什么';
    } else if (this.switch.status === 'INVALID') {
      this.errorQuery[path] = '请重新输入正确的格式';
    }
  }
  dynamicErrCheck(fc: AbstractControl, path: string) {
    fc.valueChanges.debounceTime(500).subscribe(e => {
      console.log('123');
      if (fc.hasError('required')) {
        this.errorQuery[path] = '你得写点什么';
      } else if (fc.hasError('forbiddenWord') ) {
        this.errorQuery[path] = '非法字符';
      } else if(fc.hasError('minlength')){
        this.errorQuery[path] = '长度不够';
      }else if(fc.hasError('maxlength')){
        this.errorQuery[path] = '太长了';
      }else {
        this.errorQuery[path] = '';
        console.log(12321);
      }
    });
  }
  onSubmit() {
    const fcID = this.switch.get('ID');
    const fcPW = this.switch.get('Password');
    this.haveSubmit = true;
    if (this.mode === 'userLogin') {
      this.staticErrCheck(fcID, 'ID');
      this.staticErrCheck(fcPW, 'PW');
      if( !this.statusCheck()){
        return
      }
      console.log('blbl');
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
    } else {
      console.log(this.userRegister);
      if (this.mode === 'userRegister') {
        const fcEM = this.switch.get('Email');
        this.staticErrCheck(fcID, 'ID');
        this.staticErrCheck(fcPW, 'PW');
        this.staticErrCheck(fcEM, 'EM');
        if( !this.statusCheck()){
          return
        }
      }
      //验证正确 跳转
    }
  }
}
