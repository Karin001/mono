import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/retry';
@Injectable()
export class UsernameCheckService {
  nameDuplication = new BehaviorSubject<boolean>(null);
  username: string[];
  constructor(
    private http: HttpClient
  ) { }
  getDuplication(){
    return this.nameDuplication.asObservable();
  }
  doCheck(fc: AbstractControl) {
    fc.valueChanges
      .switchMap(username => {
        console.log(username);
        return this.http.get('api/username', {observe: 'response'});
      })
      .retry(3)
      .subscribe(resp => {
        if (resp.body['code'] === 'mongo_err') {
          console.log('mongo_err');
          this.nameDuplication.next(null);
        } else if (resp.body['code'] === 'success_unlimited') {
          console.log('mongo_err');
          this.nameDuplication.next(false);
        } else if (resp.body['code'] === 'success_limited') {
          this.username = resp.body['username'];
          this.nameDuplication.next(this.username.includes(fc.value));
        }
      });
  }
}
