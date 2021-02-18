/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_USERNAME,
  CHANGE_SEARCH,
  GET_CUR_BOOK,
  LOAD_BOOK,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}

export function changeSearch(search) {
  return {
    type: CHANGE_SEARCH,
    search,
  };
}

// export function selectBook(book) {
//   return {
//     type: SELECT_BOOK,
//     book,
//   }
// }

export function getCurBook(bkey) {
  return {
    type: GET_CUR_BOOK,
    bkey,
  };
}

export function bookLoaded(bookdetail) {
  return {
    type: LOAD_BOOK,
    bookdetail,
  };
}
