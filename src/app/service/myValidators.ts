import { ValidatorFn, ValidationErrors, FormControl, AsyncValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { QueryUsernameResp } from '../interface/userType'; 
function regCheck(c: FormControl, reg: RegExp, name: string, message: string) {
  const match = reg.test(c.value);
  return !match ? {
    [name]: message
  } : null;
}
@Injectable()
export class MyValidators {

  constructor(
    private http: HttpClient
  ) {
    console.log(this.http);
   }
  minLength(num: number): ValidatorFn {
    return (c: FormControl): ValidationErrors => {
      return c.value.length < num ? {
        minLength: `请至少输入${num}位字符`
      } : null;
    };
  }
  maxLength(num: number): ValidatorFn {
    return (c: FormControl): ValidationErrors => {
      return c.value.length > num ? {
        maxLength: `只能输入${num}位以下字符`
      } : null;
    };
  }
  min_maxLength(min, max): ValidatorFn {
    return (c: FormControl): ValidationErrors => {
      return c.value.length < min || c.value.length > max ? {
        min_maxLength: `只能输入${min}-${max}位字符`
      } : null;
    };
  }

  email(c: FormControl): ValidationErrors {
    return regCheck(c, /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/, 'email', '请输入合法邮箱')
  }
  chnNameWithPoint(c: FormControl): ValidationErrors {
    return regCheck(c, /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, 'chnNameWithPoint', '请输入中文姓名');
  }
  chn_engChar(c: FormControl): ValidationErrors {
    return regCheck(c, /^[\u4E00-\u9FA5A-Za-z]+$/, 'chn_engChar', '请输入中英文字符');
  }
  mobile(c: FormControl): ValidationErrors {
    return regCheck(c, /^1(3[0-9]|4[579]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/, 'mobile', '请输入合法手机号');
  }
  eng_numChar(c: FormControl): ValidationErrors {
    return regCheck(c, /^[A-Za-z0-9]+$/, 'eng_numChar', '请输入英文、数字');
  }
  engChar(c: FormControl): ValidationErrors {
    return regCheck(c, /^[A-Za-z]+$/, 'engChar', '请输入英文字符');
  }

  quantity(c: FormControl): ValidationErrors {
    return regCheck(c, /^(0|[1-9][0-9]*)$/, 'quantity', '请输入正确数量');
  }
  footprint(c: FormControl): ValidationErrors {
    return regCheck(c, /^[A-Za-z0-9\-]+$/, 'footprint', '请输入正确格式封装');
  }
  duplicateCheckfn(): AsyncValidatorFn {
    return (c: FormControl): Observable<ValidationErrors> => {
      return this.http.get('api/username')
        .retry(3)
        .map((resp:QueryUsernameResp) => {
          console.log(121);
          if (resp.code === 'mongo_err') {
            console.log('mongo_err');
            return { duplication: true };
          } else if (resp.code === 'success_unlimited') {
            console.log('mongo_err');
            return null;
          } else if (resp.code === 'success_limited') {
            console.log(resp.usernames);
            return resp.usernames.includes(c.value) ? { duplication: true } : null;
          }
        });
    };
  }
  
}

