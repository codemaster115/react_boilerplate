/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS, LOAD_BOOKS } from 'containers/App/constants';
import {
  reposLoaded,
  repoLoadingError,
  booksLoaded,
  booksLoadingError,
} from 'containers/App/actions';

import request from 'utils/request';
import {
  makeSelectSearch,
  makeSelectBKey,
} from 'containers/HomePage/selectors';
import { bookLoaded } from './actions';
import { GET_CUR_BOOK } from './constants';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  const username = yield select(makeSelectSearch());

  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* getBooks() {
  // Select search from store
  const search = yield select(makeSelectSearch());
  const requestURL = `http://openlibrary.org/search.json?q=${search}`;

  try {
    // Call our request helper (see 'utils/request')
    const books = yield call(request, requestURL);
    yield put(booksLoaded(books.docs, search));
  } catch (err) {
    yield put(booksLoadingError(err));
  }
}

const getCurrentBookService = async arrayISBN => {
  let books = [];
  await Promise.all(
    arrayISBN.map(async isbn => {
      const newBooks = await request(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`,
      );
      books = books.concat(newBooks);
    }),
  );
  return books;
};

export function* getCurrentBook() {
  // Select search from store
  const bkey = yield select(makeSelectBKey());
  const arrayISBN = bkey.substring(1).split(',');
  try {
    const books = yield call(getCurrentBookService, arrayISBN);
    yield put(bookLoaded(books));
  } catch (err) {
    booksLoadingError(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* bookData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield takeLatest(LOAD_REPOS, getRepos);
  yield takeLatest(GET_CUR_BOOK, getCurrentBook);
  yield takeLatest(LOAD_BOOKS, getBooks);
}
