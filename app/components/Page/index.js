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
import { locationShape } from 'react-router/lib/PropTypes';
import Helmet from 'react-helmet';
import { Grid } from 'react-bem-grid';
import 'react-bem-grid/dist/Grid.css';
import Menu from '../../components/Menu';

import styles from './styles.css';

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
      isAddAllowed,
      children,
      location,
     } = this.props;
    return (
      <div className={styles.page}>
        <Helmet
          title={formatMessage(title)}
          meta={[
            { name: 'description', content: formatMessage(description) },
            { name: 'og:title', content: formatMessage(title) },
          ]}
        />
        <Menu location={location} isAddAllowed={isAddAllowed} title={<FormattedMessage {...header} />} />
        <Grid>
          { children }
        </Grid>
      </div>
    );
  }
}

Page.propTypes = {
  intl: intlShape.isRequired,
  messages: PropTypes.object,
  children: PropTypes.node,
  isAddAllowed: PropTypes.bool,
  location: locationShape,
};

export default injectIntl(Page);
