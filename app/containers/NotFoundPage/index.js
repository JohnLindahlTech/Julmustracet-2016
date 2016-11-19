/*
 * NotFoundPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { locationShape } from 'react-router/lib/PropTypes';
import messages from './messages';
import Page from '../../components/Page';

export default class NotFoundPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    location: locationShape,
  }

  render() {
    return (<Page messages={messages} location={this.props.location} />);
  }
}
