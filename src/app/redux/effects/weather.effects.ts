import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ADD_ONE, AddCities, ShowCities, LOGGIN_IN_START, LoginInStart, LoginInSuccess, FETCH_CITY_START, fetchCitySuccess, REMOVE_ONE, RemoveCities } from '../actions';
import { switchMap, map, catchError, tap, debounceTime, mergeMap } from 'rxjs/operators';
import { of, fromEvent, interval } from 'rxjs';
import { WeatherService } from '../../services/weather/weather.service';
import { AuthService } from '../../services/auth/auth.service'; 

@Injectable()
export class WeatherEffects {
  constructor(private actions$: Actions, private weatherService: WeatherService, private authService: AuthService) {
  }

  @Effect() city$ = this.actions$.pipe(
    ofType(FETCH_CITY_START),
    mergeMap(() => this.weatherService.getCity().pipe(
      map(({city}) => new fetchCitySuccess(city))
    ))
  )
  // @Effect({dispatch: false}) AddCity$ = this.actions$.pipe(
  //   ofType(ADD_ONE),
  //   switchMap(({payload}: AddCities) => this.weatherService.postCity(payload)),
  //   tap(data => console.log(data))
  // )
  @Effect({dispatch: false}) deleteCity$ = this.actions$.pipe(
    ofType(REMOVE_ONE),
    switchMap(({payload}: RemoveCities) => this.weatherService.deleteCity(payload))
  )

@Effect() auth$ = this.actions$.pipe(
  ofType(LOGGIN_IN_START),
  switchMap(({payload}: LoginInStart) => 
    this.authService
      .registerUser(payload).pipe(
        map(res => new LoginInSuccess(res)),
        tap(r => console.log(r)),
        catchError((err) => of({ type: 'LOGIN_FAILED' })) 
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