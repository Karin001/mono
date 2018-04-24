import { Component, OnInit, Input } from '@angular/core';
import { ItemSelectService } from '../../service/item-select.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() slimMode: Boolean;
  constructor(
    private itemSelect: ItemSelectService
  ) { }

  ngOnInit() {
    this.itemSelect.listenSelected().subscribe((marking: string) => {
      console.log('marking', marking);
    });
  }

}
