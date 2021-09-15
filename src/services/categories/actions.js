import { LOAD_CATEGORY } from './actionTypes';

export const loadCategory = catgories => ({
  type: LOAD_CATEGORY,
  payload: catgories
});
