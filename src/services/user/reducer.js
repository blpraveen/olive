import { LOAD_USER,LOGIN,LOGOUT,UPDATE_USER,UPDATE_PROFILE_PICTURE } from './actionTypes';

const initialState = {
  profile: {
    name: '',
    email: '',
    dob: '',
    gender: '',
    address: [],
    profileImage: '',
    orders: [],
    token:'',
    
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        profile: action.payload.user
      };
    case LOGIN:
      return {
        ...state,
        profile:action.payload.user
      };
      case LOGOUT:
      return {
        ...state,
        profile:action.payload.user
      };
    case UPDATE_USER:
      return {
        ...state,
        profile: action.payload.user
      };
    case UPDATE_PROFILE_PICTURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          profileImage: action.payload.image
        }
      };
    default:
      return state;
  }
}