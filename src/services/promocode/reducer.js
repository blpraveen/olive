import { ADD_PROMO, REMOVE_PROMO,PROMO_TYPE  } from './actionTypes';

const initialState = {
  promocodes: [],
  promoType:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PROMO:
      return {
        ...state,
        promocodes: action.payload
      };
    case REMOVE_PROMO:
      return {
        ...state,
        promocodes: action.payload
      };
      case PROMO_TYPE:
      return {
        ...state,
        promoType: action.payload
      };
    default:
      return state;
  }
}