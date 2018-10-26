import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../redux/reducers';
// import {map, pluck, mergeMap, toArray, concatMap} from 'rxjs/operators';
import { slideInAnimation } from '../../animations/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ slideInAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit  {
  
  cities: Observable<string[]>;
  
  // private querySubscription;
 
  constructor() {
    
  }
  ngOnInit() {
    
  }
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
