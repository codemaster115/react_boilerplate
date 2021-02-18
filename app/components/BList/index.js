import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { List, ListItem, makeStyles, Divider, Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Pagination from '@material-ui/lab/Pagination';

// import { selectBook } from '../../containers/HomePage/actions';
import {
  makeSelectLoading,
  makeSelectError,
} from '../../containers/App/selectors';

import Ul from './Ul';
import Wrapper from './Wrapper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    maxHeight: 600,
    padding: 0,
  },
  item: {
    padding: theme.spacing(1.2),
  },
  avatar: { marginRight: theme.spacing(5) },
  paginator: {
    justifyContent: 'center',
    padding: '10px',
  },
}));

function BList(props) {
  // useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });
  const classes = useStyles();
  const ComponentToRender = props.component;
  const { items, history } = props;

  const itemsPerPage = 7;
  const [page, setPage] = React.useState(1);
  const [noOfPages, setNoOfPages] = React.useState(
    Math.ceil((items && items.length) / itemsPerPage),
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setNoOfPages(Math.ceil((items && items.length) / itemsPerPage));
    setPage(1);
  }, [items]);

  const generateUrl = bookISBN => {
    const url = bookISBN.reduce(function(prev, curr) {
      return `${prev},${curr}`;
    });
    return `/${url}`;
  };
  let content = <div />;
  // If we have items, render them
  if (items && items.length > 0) {
    content = (
      <List dense compoent="span" className={classes.list}>
        {items
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map(item => (
            <ListItem
              key={`item-${item.key}`}
              button
              onClick={() => {
                history.push(generateUrl(item.isbn));
              }}
            >
              <ListItemText
                id={item.key}
                primary={item.title}
                secondary={item.author_name}
                className={classes.item}
              />
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar ${item.cover_i}`}
                  src={
                    item.cover_i &&
                    `https://covers.openlibrary.org/b/id/${item.cover_i}.jpg`
                  }
                  className={classes.avatar}
                  variant="rounded"
                />
              </ListItemAvatar>
            </ListItem>
          ))}
      </List>
    );
  } else {
    content = <ComponentToRender />;
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>
      <Divider />
      {items && items.length > 0 && (
        <Box component="span">
          <Pagination
            count={noOfPages}
            page={page}
            onChange={handleChange}
            defaultPage={1}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            classes={{ ul: classes.paginator }}
          />
        </Box>
      )}
    </Wrapper>
  );
}

BList.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array,
  // onSelectBook: PropTypes.func
  history: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps() {}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(
  compose(
    withConnect,
    memo,
  )(BList),
);
