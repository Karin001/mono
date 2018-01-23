import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../../restapi.service';
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  number;
  detailInfo = {};
  @Input() disable;
  constructor(
    private activatedRoute: ActivatedRoute,
    private restapi: RestapiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
    .mergeMap((data) => {
      console.log(data['number']);
      this.number = data['number'];
      return this.restapi.streamMock_itemDetail();
    })
    .subscribe((details) =>{
      console.log(details);
      this.detailInfo = details[this.number];

    })
    }



}
