import { ADD_PROMO, REMOVE_PROMO,PROMO_TYPE } from './actionTypes';

export const addPromo = promocodes => ({
  type: ADD_PROMO,
  payload: promocodes
});

export const removePromo = promocodes => ({
  type: REMOVE_PROMO,
  payload: promocodes
});
export const addPromoType = promoType => ({
  type: PROMO_TYPE,
  payload: promoType
});
