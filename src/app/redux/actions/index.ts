import { Action } from '@ngrx/store';

export const ADD_ONE = '[Cities] Add One';
export const SHOW_CITIES = '[Cities] Show Cities';
export const REMOVE_ONE = '[Cities] Remove One'

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
export type Action = AddCities | RemoveCities | ShowCities;