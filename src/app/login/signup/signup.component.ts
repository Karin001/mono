import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { RestapiService } from '../../restapi.service';
import { myValidators } from '../../my-validators/myValidators'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUp: FormGroup
  errorInfos_idps = [{
    errorCode: 'min_maxLength',
    message: '请输入4-16个字符'
  },
  {
    errorCode: 'eng_numChar',
    message: '允许英文、数字'
  }];
  errorInfos_em = [{
    errorCode: 'email',
    message: '请输入正确格式邮箱'
  }];
  errorInfos_ava = [{
    errorCode: 'message',
    message: '请选择头像'
  }]
  mailOptions = [
    '163.com','qq.com'
  ]
  changecs = {
    hintMode: 'hint',
    okMode: 'ok',
    alertMode: 'alert'
  };
  avatarUrls = [
    '../../../assets/avatar/avatar1.jpg','../../../assets/avatar/avatar2.jpg','../../../assets/avatar/avatar3.jpg','../../../assets/avatar/avatar4.jpg',
    '../../../assets/avatar/avatar5.jpg','../../../assets/avatar/avatar6.jpg','../../../assets/avatar/avatar7.jpg','../../../assets/avatar/avatar8.jpg',
    '../../../assets/avatar/avatar9.jpg','../../../assets/avatar/avatar10.jpg','../../../assets/avatar/avatar11.jpg','../../../assets/avatar/avatar12.jpg',
    '../../../assets/avatar/avatar13.jpg','../../../assets/avatar/avatar14.jpg','../../../assets/avatar/avatar15.jpg','../../../assets/avatar/avatar16.jpg',
    '../../../assets/avatar/avatar17.jpg','../../../assets/avatar/avatar18.jpg','../../../assets/avatar/avatar19.jpg','../../../assets/avatar/avatar20.jpg',
    '../../../assets/avatar/avatar21.jpg','../../../assets/avatar/avatar22.jpg','../../../assets/avatar/avatar23.jpg','../../../assets/avatar/avatar24.jpg',
    '../../../assets/avatar/avatar25.jpg','../../../assets/avatar/avatar26.jpg'
  ]
  constructor(
    private fb: FormBuilder,
    private restApi: RestapiService
  ) {
    this.creatForm();
  }

  ngOnInit() {
  }
  creatForm() {
    this.signUp = this.fb.group({
      'ID': ['', [myValidators.min_maxLength(4, 16), myValidators.eng_numChar]],
      'Password': ['', [myValidators.min_maxLength(6, 16), myValidators.eng_numChar]],
      'Email': ['', [myValidators.email]],
      'Avatar':['']
    });
  }
  onSubmit(){
    console.log(this.signUp)
  }


}
