import {ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';

export class myValidators {
  static minLength(num: number): ValidatorFn{
    return (c: FormControl): ValidationErrors => {
      return c.value.length<num? {
        minLength: `请至少输入${num}位字符`
      }: null
    }
  }
  static maxLength(num: number): ValidatorFn{
    return (c: FormControl): ValidationErrors => {
      return c.value.length>num? {
        maxLength: `只能输入${num}位以下字符`
      }: null
    }
  }
  static min_maxLength(min, max): ValidatorFn{
    return (c: FormControl): ValidationErrors => {
      return c.value.length<min || c.value.length>max? {
        min_maxLength: `只能输入${min}-${max}位字符`
      }: null
    }
  }
  static regCheck(c:FormControl ,reg: RegExp, name:string, message: string){
    const match = reg.test(c.value);
    return !match? {
      [name] : message
    }: null
  }
  static email(c:FormControl): ValidationErrors{
   return myValidators.regCheck(c,  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/,'email', '请输入合法邮箱')
  }
  static chnNameWithPoint(c:FormControl): ValidationErrors{
   return myValidators.regCheck(c, /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/,'chnNameWithPoint', '请输入中文姓名')
  }
  static chn_engChar(c:FormControl): ValidationErrors{
    return myValidators.regCheck(c, /^[\u4E00-\u9FA5A-Za-z]+$/,'chn_engChar', '请输入中英文字符')
  }
  static mobile(c:FormControl): ValidationErrors{
    return myValidators.regCheck(c, /^1(3[0-9]|4[579]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/,'mobile','请输入合法手机号')
  }
  static eng_numChar(c:FormControl): ValidationErrors{
    return myValidators.regCheck(c, /^[A-Za-z0-9]+$/,'eng_numChar','请输入英文、数字')
  }
  static engChar(c:FormControl): ValidationErrors{
    return myValidators.regCheck(c, /^[A-Za-z]+$/,'engChar', '请输入英文字符')
  }
}

