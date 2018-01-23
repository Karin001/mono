import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class RestapiService {

  constructor(private hc: HttpClient) { }
  streamMock_allItem(){
    return this.hc.get(`assets/data/itemlist.json`);
  }
  streamMock_itemDetail(){
    return this.hc.get(`assets/data/itemdetail.json`);
  }
  stream_allItem(){
    return this.hc.get('/api/itemlist');
  }
  logIn(userinfo){
    return this.hc.post('api/logIn',userinfo);
  }

}
