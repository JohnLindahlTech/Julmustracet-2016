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
import { Row, Col } from 'react-bem-grid';
import { locationShape } from 'react-router/lib/PropTypes';
import Page from 'components/Page';
import PlayerTopList from 'containers/PlayerTopList';
import BrandTopList from 'containers/BrandTopList';
import messages from './messages';


export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    location: locationShape,
  }
  render() {
    return (<Page messages={messages} isAddAllowed location={this.props.location}>
      <Row>
        <Col md={6} xs={12}>
          <PlayerTopList />
        </Col>
        <Col md={6} xs={12}>
          <BrandTopList />
        </Col>
      </Row>

    </Page>);
  }
}
