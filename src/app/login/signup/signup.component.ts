import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { RestapiService } from '../..//service/restapi.service';
import { MyValidators } from '../../service/myValidators';
import { HttpClient } from '@angular/common/http';
import { UsernameCheckService } from '../../service/username-check.service';
import 'rxjs/add/operator/combineLatest';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUp: FormGroup;
  get username(): AbstractControl {
    return this.signUp.controls['ID'];
  }
  disabled = true;
  progressBarSet = false;
  @ViewChild('submitButton') submitButton;
  errorInfos_id = [{
    errorCode: 'min_maxLength',
    message: '输入4-16个字符'
  },
  {
    errorCode: 'eng_numChar',
    message: '英文、数字'
  },
  {
    errorCode: 'duplication',
    message: 'ID重名校验'
  }
  ];
  errorInfos_ps = [{
    errorCode: 'min_maxLength',
    message: '输入4-16个字符'
  },
  {
    errorCode: 'eng_numChar',
    message: '英文、数字'
  }];
  errorInfos_em = [
    {
      errorCode: 'email',
      message: '输入正确格式邮箱'
    }
  ];

  mailOptions = [
    '163.com', 'qq.com'
  ];
  changecs = {
    hintMode: 'hint',
    okMode: 'ok',
    alertMode: 'alert'
  };
  avatarUrls = [
    '../../../assets/avatar/avatar1.jpg', '../../../assets/avatar/avatar2.jpg', '../../../assets/avatar/avatar3.jpg', '../../../assets/avatar/avatar4.jpg',
    '../../../assets/avatar/avatar5.jpg', '../../../assets/avatar/avatar6.jpg', '../../../assets/avatar/avatar7.jpg', '../../../assets/avatar/avatar8.jpg',
    '../../../assets/avatar/avatar9.jpg', '../../../assets/avatar/avatar10.jpg', '../../../assets/avatar/avatar11.jpg', '../../../assets/avatar/avatar12.jpg',
    '../../../assets/avatar/avatar13.jpg', '../../../assets/avatar/avatar14.jpg', '../../../assets/avatar/avatar15.jpg', '../../../assets/avatar/avatar16.jpg',
    '../../../assets/avatar/avatar17.jpg', '../../../assets/avatar/avatar18.jpg', '../../../assets/avatar/avatar19.jpg', '../../../assets/avatar/avatar20.jpg',
    '../../../assets/avatar/avatar21.jpg', '../../../assets/avatar/avatar22.jpg', '../../../assets/avatar/avatar23.jpg', '../../../assets/avatar/avatar24.jpg',
    '../../../assets/avatar/avatar25.jpg', '../../../assets/avatar/avatar26.jpg'
  ]
  constructor(
    private fb: FormBuilder,
    private restApi: RestapiService,
    private userCheck: UsernameCheckService,
    public http: HttpClient,
    public myValidators: MyValidators

  ) {

    this.creatForm();
  }

  ngOnInit() {
    this.myValidators.getDuplicationCheckState().subscribe(state => {
      console.log('progressBar', state);
      if (state === 'start') {
        this.progressBarSet = true;
      } else if (state === 'end') {
        this.progressBarSet = false;
      }
    });
    this.signUp.statusChanges
      .map(v => v === 'VALID' ? false : true)

      .subscribe(v => {
        this.disabled = v;
        console.log(v);
      });
    this.signUp.controls['ID'].valueChanges.subscribe(v => {
      if (this.signUp.controls['ID'].hasError('min_maxLength') ||
        this.signUp.controls['ID'].hasError('eng_numChar')) {
        this.progressBarSet = false;
      } else {
        this.myValidators.DuplicationCheckStart();
      }
    });


  }
  creatForm() {
    this.signUp = this.fb.group({
      'ID': ['', [
        this.myValidators.min_maxLength(4, 16),
        this.myValidators.eng_numChar,
      ]
      ],
      'Password': ['', [this.myValidators.min_maxLength(6, 16), this.myValidators.eng_numChar]],
      'Email': ['', [this.myValidators.email]],

    });
    this.signUp.get('ID').setAsyncValidators(this.myValidators.duplicateCheckfn());
  }
  onSubmit() {

    if (this.signUp.valid) {
      console.log(this.signUp);
      this.restApi.signUp(this.signUp.value);
    }
  }


}
