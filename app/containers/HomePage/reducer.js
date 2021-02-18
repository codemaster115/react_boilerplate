/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  CHANGE_USERNAME,
  CHANGE_SEARCH,
  GET_CUR_BOOK,
  LOAD_BOOK,
} from './constants';

// The initial state of the App
export const initialState = {
  username: '',
  search: '',
  bkey: '',
  bookdetail: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        draft.username = action.username.replace(/@/gi, '');
        break;
      case CHANGE_SEARCH:
        draft.search = action.search;
        break;
      case GET_CUR_BOOK:
        draft.bkey = action.bkey;
        break;
      case LOAD_BOOK:
        draft.bookdetail = action.bookdetail;
        break;
    }
  });

export default homeReducer;
