import { Component, OnInit } from '@angular/core';
import {UiService} from '../../services/ui/ui.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  LinkAuth: boolean;
  constructor(public ui: UiService) { }

  ngOnInit() {
    this.ui.LinkAuth.subscribe((value) => {
      this.LinkAuth = value;
    });
  }
  onClickToLink() {
    this.ui.LinkAuth.next(!this.LinkAuth);
  }

}
