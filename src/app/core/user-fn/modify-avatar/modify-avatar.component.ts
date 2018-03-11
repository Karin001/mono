import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestapiService } from '../../../restapi.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-modify-avatar',
  templateUrl: './modify-avatar.component.html',
  styleUrls: ['./modify-avatar.component.scss']
})
export class ModifyAvatarComponent implements OnInit {
  avatarUrls = [
    '../../../assets/avatar/avatar1.jpg', '../../../assets/avatar/avatar2.jpg', '../../../assets/avatar/avatar3.jpg', '../../../assets/avatar/avatar4.jpg',
    '../../../assets/avatar/avatar5.jpg', '../../../assets/avatar/avatar6.jpg', '../../../assets/avatar/avatar7.jpg', '../../../assets/avatar/avatar8.jpg',
    '../../../assets/avatar/avatar9.jpg', '../../../assets/avatar/avatar10.jpg', '../../../assets/avatar/avatar11.jpg', '../../../assets/avatar/avatar12.jpg',
    '../../../assets/avatar/avatar13.jpg', '../../../assets/avatar/avatar14.jpg', '../../../assets/avatar/avatar15.jpg', '../../../assets/avatar/avatar16.jpg',
    '../../../assets/avatar/avatar17.jpg', '../../../assets/avatar/avatar18.jpg', '../../../assets/avatar/avatar19.jpg', '../../../assets/avatar/avatar20.jpg',
    '../../../assets/avatar/avatar21.jpg', '../../../assets/avatar/avatar22.jpg', '../../../assets/avatar/avatar23.jpg', '../../../assets/avatar/avatar24.jpg',
    '../../../assets/avatar/avatar25.jpg', '../../../assets/avatar/avatar26.jpg'
  ];
  disabled = false;
  load = false;
  changeAvatar: FormGroup;
  constructor(
    private fb: FormBuilder,
    private restApi: RestapiService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ModifyAvatarComponent>
  ) { }

  ngOnInit() {
    this.creatForm();
  }
  creatForm() {
    this.changeAvatar = this.fb.group({
      'Avatar': ['../../../assets/avatar/avatar1.jpg']
    });
  }
  onSubmit() {

    if (this.changeAvatar.valid) {
      this.disabled = true;
      this.load = true;
      console.log(this.changeAvatar);
      this.restApi.changeAvatarPic(
        {
          avatar: this.changeAvatar.controls['Avatar'].value
        },
        () => {
          this.load = false;
          this.disabled = false;
          this.openSnackBar('头像修改成功');
          this.dialogRef.close();
        },
        () => {
          this.load = false;
          this.disabled = false;
        }
      );
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
