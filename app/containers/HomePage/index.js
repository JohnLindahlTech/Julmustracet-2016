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
import messages from './messages';
import Page from '../../components/Page';
import TopList from '../../components/TopList';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    // TODO Get rows data.
    const rows = [
      {
        position: 1,
        name: 'Nils Larson',
        daily: 1.23,
        total: 45.6789,
      },
      {
        position: 2,
        name: 'Klas Klättermus',
        daily: 10.23,
        total: 145.6789,
      },
    ];
    return (<Page messages={messages}>
      <h2>Test 1</h2>
      <TopList rows={rows} />
      <h2>Test 2</h2>
      <TopList rows={rows} />
    </Page>);
  }
}
