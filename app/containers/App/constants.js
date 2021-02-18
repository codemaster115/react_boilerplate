/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

export const LOAD_BOOKS = 'boilerplate/App/LOAD_BOOKS';
export const LOAD_BOOKS_SUCCESS = 'boilerplate/App/LOAD_BOOKS_SUCCESS';
export const LOAD_BOOKS_ERROR = 'boilerplate/App/LOAD_BOOKS_ERROR';

export const SELECT_BOOK = 'boilerplate/App/SELECT_BOOK';
export const SELECT_BOOK_SUCCESS = 'boilerplate/App/SELECT_BOOK_SUCCESS';
export const SELECT_BOOK_ERROR = 'boilerplate/App/SELECT_BOOK_ERROR';
