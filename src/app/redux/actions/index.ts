import { Action } from '@ngrx/store';

export const ADD_ONE = '[Cities] Add One';
export const SHOW_CITIES = '[Cities] Show Cities';
export const REMOVE_ONE = '[Cities] Remove One';
export const FETCH_CITY_START = '[Cities] Fetch City';
export const FETCH_CITY_SUCCESS = '[Cities] Fetch City Success';
export const LOGGIN_IN_START = '[Auth] Loggin In';
export const LOGGIN_IN_SUCCESS = '[Auth] Login In Success';


export class fetchCity implements Action {
  readonly type = FETCH_CITY_START;
  constructor() { }
}
export class fetchCitySuccess implements Action {
  readonly type = FETCH_CITY_SUCCESS;
  constructor(public payload: any) { }
}

export class AddCities implements Action {
    readonly type = ADD_ONE;
    constructor(public payload: string) { }
}
export class ShowCities implements Action {
  readonly type = SHOW_CITIES;
  constructor(public payload: any) { }
}
export class RemoveCities implements Action {
  readonly type = REMOVE_ONE;
  constructor(public payload: string) { }
}
export class LoginInStart implements Action {
  readonly type = LOGGIN_IN_START;
  constructor(public payload: object) { }
}
export class LoginInSuccess implements Action {
  readonly type = LOGGIN_IN_SUCCESS;
  constructor(public payload: object) { }
}
export type Action = AddCities 
| RemoveCities 
| ShowCities 
| LoginInStart 
| LoginInSuccess 
| fetchCity
|fetchCitySuccess;