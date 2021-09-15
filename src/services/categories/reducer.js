import { LOAD_CATEGORY} from './actionTypes';

const initialState = {
  products: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORY:
      return {
        ...state,
        products: action.catgories
      };
    default:
      return state;
  }
}