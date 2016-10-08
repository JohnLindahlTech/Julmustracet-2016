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

import React, { PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import Menu from '../../components/Menu';

class Page extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
      intl: {
        formatMessage,
      },
      messages: {
        title,
        description,
        header,
      },
      children,
     } = this.props;
    return (
      <div>
        <Helmet
          title={formatMessage(title)}
          meta={[
            { name: 'description', content: formatMessage(description) },
          ]}
        />
        <Menu title={<FormattedMessage {...header} />}></Menu>
        { children }
      </div>
    );
  }
}

Page.propTypes = {
  intl: intlShape.isRequired,
  messages: PropTypes.shape({
    title: PropTypes.object.isRequired,
    header: PropTypes.object.isRequired,
    description: PropTypes.object.isRequired,
  }),
  children: PropTypes.node,
};

export default injectIntl(Page);
