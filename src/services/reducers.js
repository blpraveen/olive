import { combineReducers } from 'redux';
import cartReducer from './cart/reducer';
import totalReducer from './total/reducer';
import userReducer from './user/reducer';
import bookMarkReducer from './bookmark/reducer';
import categoryReducer from './categories/reducer';
import promoReducer from './promocode/reducer';

export default combineReducers({
  cart: cartReducer,
  total: totalReducer,
  user:userReducer,
  bookmarks:bookMarkReducer,
  catgories:categoryReducer,
  promocodes:promoReducer,
});