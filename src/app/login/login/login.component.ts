import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { forbiddenWordValidator } from '../../utils/custom-validator';
import { RestapiService } from '../../restapi.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mode = 'login'
  userLogin: FormGroup;
  userRegister: FormGroup;
  title = '登录';
  constructor(
    private fb: FormBuilder,
    private restapi: RestapiService
  ) {
    this.creatForm();
    console.log(this.userLogin);
  }

  ngOnInit() {
  }
  register() {
    this.mode = 'register';
    this.title = "注册";
    this.creatForm();
    console.log(this.userRegister);
  }
  login() {
    this.mode = 'login';
    this.title = '登录';
    this.creatForm();
  }
  creatForm() {
    if(this.mode === 'login') {
      this.userLogin = this.fb.group({
        'ID': ['', [Validators.minLength(2), Validators.required, forbiddenWordValidator(/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/)] ],
        'Password': ['', [ forbiddenWordValidator(/^[a-zA-Z]\w{5,17}$/)] ]
      });
    } else {
      this.userRegister = this.fb.group({
        'ID': ['', [Validators.minLength(2), Validators.required, forbiddenWordValidator(/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/)] ],
        'Email': ['', [Validators.required, forbiddenWordValidator(/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/)] ],
        'Password': ['', [ forbiddenWordValidator(/^[a-zA-Z]\w{5,17}$/)] ]
      });
    }

  }
  onSubmit(){
    if(this.mode ==='login'){
      console.log(this.userLogin);
      this.restapi.logIn({
        username: this.userLogin.value['ID'],
        password: this.userLogin.value['Password']
      }).subscribe((data) => {
        if(data['code'] === 'logged'){

        } else if(data['code'] === 'mongo_err'){

        } else if(data['code'] === 'invalid_user'){

        } else if(data['code'] === 'invalid_password'){

        } else if(data['code'] === 'success'){

        } else{

        }
      });
      //验证正确 跳转
    }else{
      console.log(this.userRegister);
      //验证正确 跳转
    }
  }
}
