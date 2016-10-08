/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import Helmet from 'react-helmet';
import styles from './styles.css';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    intl: intlShape.isRequired,
  };

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={styles.container}>
        <Helmet
          title={formatMessage(messages.title)}
          meta={[
            { name: 'description', content: formatMessage(messages.description) },
          ]}
        />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

export default injectIntl(App);
