import type { ActionTypes } from './action';
import type { State } from '../types/state';
import { 
  CHANGE_CITY, 
  FILL_OFFERS, 
  SET_SORT_TYPE, 
  SET_AUTHORIZATION_STATUS,
  SET_LOADING_STATUS,
  TOGGLE_FAVORITE 
} from './action';
import { AuthorizationStatus } from '../const';

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: 'popular',
  authorizationStatus: AuthorizationStatus.Unknown,
  isLoading: false,
};

function reducer(state = initialState, action: ActionTypes): State {
  switch (action.type) {
    case CHANGE_CITY:
      return { 
        ...state, 
        city: action.payload 
      };
    
    case FILL_OFFERS:
      return { 
        ...state, 
        offers: action.payload 
      };
    
    case SET_SORT_TYPE:
      return { 
        ...state, 
        sortType: action.payload 
      };
    
    case SET_AUTHORIZATION_STATUS:
      return { 
        ...state, 
        authorizationStatus: action.payload 
      };
    
    case SET_LOADING_STATUS:
      return { 
        ...state, 
        isLoading: action.payload 
      };
    
    case TOGGLE_FAVORITE:
      return {
        ...state,
        offers: state.offers.map(offer => 
          offer.id === action.payload 
            ? { ...offer, isFavorite: !offer.isFavorite }
            : offer
        )
      };
    
    default:
      return state;
  }
}

export default reducer;