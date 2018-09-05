import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../redux/reducers';

@Component({
  selector: 'app-home',
  // templateUrl: './home.component.html',
  template: `<div class="main__container">

              <app-weather-card *ngFor="let city of cities | async; let i = index" [i]="i" [city]="city"></app-weather-card>
              <app-add-card></app-add-card>

            </div>`,
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  
  cities: Observable<string[]>

  constructor(private store: Store<fromRoot.State>) {
    this.cities = store.select(fromRoot.getCities);
  }

  ngOnInit() {

  }
}
