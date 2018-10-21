import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class UiService {

  darkModeState: BehaviorSubject<boolean>;
  LinkAuth: BehaviorSubject<boolean>;

  constructor() {
    // TODO: if the user is signed in get the default value from Firebase
    this.darkModeState = new BehaviorSubject<boolean>(false);
    this.LinkAuth = new BehaviorSubject<boolean>(false);
  }
}
