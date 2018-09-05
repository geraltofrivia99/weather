import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ADD_ONE, AddCities, ShowCities } from '../actions';
import { switchMap, map, catchError, tap, debounceTime } from 'rxjs/operators';
import { of, fromEvent, interval } from 'rxjs';
import { WeatherService } from '../../services/weather/weather.service';

@Injectable()
export class WeatherEffects {
  constructor(private actions$: Actions, private weatherService: WeatherService) {
  }
@Effect() test$ = this.actions$.pipe(
  ofType(ADD_ONE),
  switchMap((action: AddCities) => 
    this.weatherService
      .getTest(action.payload)
      .pipe(
        map(c => new ShowCities(c)),
        catchError(err => of({ type: 'ERROR', payload: err }))
      )
      
  )
)
@Effect()
resize$ = fromEvent(window, 'resize').pipe(
  debounceTime(300),
  map(e => ({ type: 'RESIZE_ACTION', payload: e }))
);

// @Effect()
// interval$ = interval(2000).pipe(
//   map(_ => ({ type: 'REPLAY_ACT' }))
// );
@Effect({ dispatch: false }) logActions$ = this.actions$
  .pipe(
    ofType(ADD_ONE),
    tap((action: AddCities) => {
      console.log('action',action);
    })
  )
  
}