/*
 * BookDetailPage
 *
 * List all the features
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { withRouter } from 'react-router-dom';

import H1 from 'components/H1';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import saga from '../HomePage/saga';
import reducer from '../HomePage/reducer';
import BookLink from './BookLink';
import messages from './messages';
import { makeSelectBookDetail } from '../HomePage/selectors';
import { getCurBook } from '../HomePage/actions';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  table: {
    minWidth: 650,
    maxHeight: 600,
    overflow: 'scroll',
    padding: 0,
  },
});

function createData(title, name, url, img) {
  return { title, name, url, img };
}

const key = 'home';

function BookDetailPage(props) {
  const classes = useStyles();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { onGetCurBook, bookDetails, location } = props;

  useEffect(() => {
    if (props && location) onGetCurBook(props.location.pathname);
  }, []);

  const rows = [];
  if (bookDetails.length > 0) {
    bookDetails.map(book => {
      const bookInfo = Object.values(book)[0];
      rows.push(
        createData(
          bookInfo.title,
          bookInfo.authors[0].name,
          bookInfo.url,
          bookInfo.cover && bookInfo.cover.small,
        ),
      );
      return true;
    });
  }
  return (
    <div>
      <Helmet>
        <title>Book Detail Page</title>
        <meta
          name="description"
          content="Book Detail page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <TableContainer className={classes.container} component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell align="left">Author name</TableCell>
              <TableCell align="center">Url</TableCell>
              <TableCell align="center">Cover Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.url}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  <BookLink href={row.url} target="_blank">
                    {row.url}
                  </BookLink>
                </TableCell>
                <TableCell align="center">
                  <img src={row.img} alt={row.img} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

BookDetailPage.propTypes = {
  bookDetails: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onGetCurBook: PropTypes.func,
  location: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  bookDetails: makeSelectBookDetail(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetCurBook: bkey => dispatch(getCurBook(bkey)),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookDetailPage),
);
