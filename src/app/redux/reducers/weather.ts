import * as weatherActions from '../actions';

export interface State {
  ownCities
}

export const InitialState: State = {
  ownCities: ['paris', 'moscow']
}

export function weatherReducer(state = InitialState, action: weatherActions.Action) {
  switch (action.type) {
    case weatherActions.ADD_ONE:
      return {
        ...state, ownCities: [...state.ownCities, action.payload]
      }
      case weatherActions.SHOW_CITIES:
        console.log('www',action.payload)
      return state
    case weatherActions.REMOVE_ONE:
      return {
        ...state, ownCities: state.ownCities.filter(c => c !== action.payload)
      }
    default:
      return state;
  }
}

export const getCities = (state: State) => state.ownCities;