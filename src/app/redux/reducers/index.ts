import { ActionReducerMap, createSelector, createFeatureSelector, 
  ActionReducer, MetaReducer } from '@ngrx/store';
  import * as fromWeather from './weather';
  import { environment } from '../../../environments/environment';
  import { storeFreeze } from 'ngrx-store-freeze';

  export interface State {
    weather: fromWeather.State;
  }

  export const reducers: ActionReducerMap<State> = {
    weather: fromWeather.weatherReducer
  };

  // export function logger(reducer: ActionReducer<State>):
  // ActionReducer<State> {
  //   return function (state: State, action: any): State {
  //     console.log('state', state);
  //     console.log('action', action);
  //     return reducer(state, action);
  //   };
  // }

  export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];;

  export const getCitiesState = createFeatureSelector<fromWeather.State>('weather');

  export const getCities = createSelector(
    getCitiesState,
    fromWeather.getCities,
  );