import { LOAD_BOOKMARK, REMOVE_BOOKMARK, UPDATE_BOOKMARK} from './actionTypes';

const initialState = {
  bookmarks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOOKMARK:
      return {
        ...state,
        bookmarks: action.payload.bookmarks
      };
    case UPDATE_BOOKMARK:
      return {
        ...state,
        bookmarks: action.payload.bookmarks
      };
    default:
      return state;
  }
}