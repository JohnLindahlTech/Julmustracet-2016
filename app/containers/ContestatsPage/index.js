/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';
import Helmet from 'react-helmet';
import Menu from '../../components/Menu';

class ContestantsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Helmet
          title={formatMessage(messages.title)}
          meta={[
            { name: 'description', content: 'Description of JulmustRacet' },
          ]}
        />
        <Menu title={<FormattedMessage {...messages.header} />}></Menu>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
      </div>
    );
  }
}

ContestantsPage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ContestantsPage);
