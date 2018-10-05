import { ActionReducerMap, createSelector, createFeatureSelector, 
  ActionReducer, MetaReducer } from '@ngrx/store';
  import * as fromWeather from './weather';
  import * as fromAuth from './auth';
  import { environment } from '../../../environments/environment';
  import { storeFreeze } from 'ngrx-store-freeze';

  export interface State {
    weather: fromWeather.State;
    auth: fromAuth.State;
  }

  export const reducers: ActionReducerMap<State> = {
    weather: fromWeather.weatherReducer,
    auth: fromAuth.authReducer
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
  export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

  export const getCities = createSelector(
    getCitiesState,
    fromWeather.getCities,
  );
  export const getAuth = createSelector(
    getAuthState,
    fromAuth.getAuth
  )