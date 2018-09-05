import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {UiService} from './services/ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  showMenu = false;
  darkModeActive: boolean;

  constructor(public ui: UiService) {

  }

  ngOnInit() {
    this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

}
