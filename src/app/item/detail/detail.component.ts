import { Component, OnInit, Input } from '@angular/core';
import { ItemSelectService } from '../../service/item-select.service';
import { RestapiService } from '../../service/restapi.service';
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  number;
  detailInfo:any = {};
  @Input() disable;
  constructor(
    private restapi: RestapiService,
    private itemSelect: ItemSelectService
  ) { }

  ngOnInit() {
    this.itemSelect.listenSelected().subscribe(marking => {
      if(this.restapi.localItemList){
        this.restapi.localItemList.items.forEach(item=>{
          if(item.marking === marking){
            this.detailInfo.setUpTime = item.setUpTime;
            this.detailInfo.property = item.property || [];
            this.detailInfo.quantity = item.quantity;
            this.detailInfo.project = item.project || [];

            console.log(this.detailInfo);
            return;
          }
        })
      }

    })
    // this.activatedRoute.params
    // .mergeMap((data) => {
    //   console.log(data['number']);
    //   this.number = data['number'];
    //   return this.restapi.streamMock_itemDetail();
    // })
    // .subscribe((details) =>{
    //   console.log(details);
    //   this.detailInfo = details[this.number];

    // })
    }



}
