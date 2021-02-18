import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import BookDetailPage from '../index';

describe('<BookDetailPage />', () => {
  it('should render its heading', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <BookDetailPage />
      </IntlProvider>,
    );

    expect(firstChild).toMatchSnapshot();
  });
});
