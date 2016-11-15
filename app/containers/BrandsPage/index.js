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
import messages from './messages';
import Page from '../../components/Page';
import BrandTopList from '../BrandTopList';

export default class BrandsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (<Page messages={messages} isAddAllowed>
      <Row>
        <Col xs={12}>
          <BrandTopList />
        </Col>
      </Row>
    </Page>);
  }
}
