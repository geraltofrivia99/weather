import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../redux/reducers';
// import {map, pluck, mergeMap, toArray, concatMap} from 'rxjs/operators';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // template: `<div class="main__container">
  //             <app-weather-card *ngFor="let city of cities | async; let i = index" [i]="i" [city]="city"></app-weather-card>
  //             <app-add-card></app-add-card>

  //           </div>`,
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit  {
  
  cities: Observable<string[]>;
  
  // private querySubscription;
 
  constructor() {
    
  }
  ngOnInit() {
    
  }
}
