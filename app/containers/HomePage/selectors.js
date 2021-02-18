/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );

const makeSelectSearch = () =>
  createSelector(
    selectHome,
    homeState => homeState.search,
  );

const makeSelectBKey = () =>
  createSelector(
    selectHome,
    homeState => homeState.bkey,
  );

const makeSelectBookDetail = () =>
  createSelector(
    selectHome,
    homeState => homeState.bookdetail,
  );

export {
  selectHome,
  makeSelectUsername,
  makeSelectSearch,
  makeSelectBKey,
  makeSelectBookDetail,
};
