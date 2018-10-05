import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {UiService} from './services/ui/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './redux/reducers';
import { fetchCity } from './redux/actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {
  showMenu = false;
  darkModeActive: boolean;

  constructor(public ui: UiService, private store: Store<fromRoot.State>) {

  }

  ngOnInit() {
    this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });
    this.store.dispatch(new fetchCity());
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

}
