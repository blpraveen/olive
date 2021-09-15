import { LOAD_BOOKMARK, UPDATE_BOOKMARK} from './actionTypes';

export const loadBookMark = bookmarks => ({
  type: LOAD_BOOKMARK,
  payload: {bookmarks}
});


export const updateBookMark = bookmarks => ({
  type: UPDATE_BOOKMARK,
  payload: {bookmarks}
});