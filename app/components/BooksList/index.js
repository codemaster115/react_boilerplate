import React from 'react';
import PropTypes from 'prop-types';

import BList from 'components/BList';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
// import BookListItem from 'containers/BookListItem';

function BooksList({ loading, books }) {
  if (loading) {
    return <BList component={LoadingIndicator} />;
  }

  const ErrorComponent = () => (
    <ListItem item="Something went wrong, please try again!" />
  );

  // if (error !== false) {
  //   return <List component={ErrorComponent} />;
  // }

  if (books !== false) {
    return <BList items={books} component={ErrorComponent} />;
  }

  return null;
}

BooksList.propTypes = {
  loading: PropTypes.bool,
  // error: PropTypes.any,
  books: PropTypes.any,
};

export default BooksList;
