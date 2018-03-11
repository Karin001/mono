import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestapiService } from '../../../restapi.service';
import { MyValidators } from '../../../service/myValidators';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/take';
@Component({
  selector: 'app-change-ps',
  templateUrl: './change-ps.component.html',
  styleUrls: ['./change-ps.component.scss']
})
export class ChangePsComponent implements OnInit, OnDestroy {

  changePS: FormGroup;
  errorPS = false;
  disabled = true;
  load = false;
  formManeger: Subscription;
  constructor(
    private fb: FormBuilder,
    private restApi: RestapiService,
    private myValidators: MyValidators,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ChangePsComponent>
  ) { }

  ngOnInit() {
    this.creatForm();
    this.formManeger = this.changePS.statusChanges
      .map(v => v === 'INVALID' ? true : false)

      .subscribe(v => {
        this.disabled = v;
      });


  }
  ngOnDestroy() {
    this.formManeger.unsubscribe();
  }
  creatForm() {
    this.changePS = this.fb.group({
      'OldPS': ['', [this.myValidators.min_maxLength(6, 16), this.myValidators.eng_numChar]],
      'NewPS': ['', [this.myValidators.min_maxLength(6, 16), this.myValidators.eng_numChar]]
    });
  }
  onSubmit() {

    if (this.changePS.valid) {
      console.log(this.changePS);
      this.load = true;
      this.disabled = true;
      this.restApi.changePs(
        {
          old: this.changePS.controls['OldPS'].value,
          new: this.changePS.controls['NewPS'].value
        },
        () => {
          this.errorPS = false;
          this.load = false;
          this.disabled = false;
          this.openSnackBar('密码修改成功');
          this.dialogRef.close();
        },
        () => {
          this.errorPS = true;
          this.load = false;
          this.disabled = false;
        });

    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
