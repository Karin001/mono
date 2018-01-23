import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { forbiddenWordValidator } from '../../utils/custom-validator';
@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit {
  newItem;
  constructor(
    public dialogRef: MatDialogRef<AdditemComponent>,
    private fb: FormBuilder,
  )
  {
    this.creatForm();
   }

  ngOnInit() {
  }
  creatForm() {

      this.newItem = this.fb.group({
        'name': ['', [Validators.minLength(2), Validators.required, forbiddenWordValidator(/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/)] ],
        'marking': ['', [ forbiddenWordValidator(/^[a-zA-Z]\w{5,17}$/)] ],
        'quantity':['',[Validators.minLength(2)]],
        'unit':['',[Validators.minLength(2)]],
        'where':['',[Validators.minLength(2)]]
      });
  }
  onSubmit(){
    console.log(this.newItem.value);
  }
}
