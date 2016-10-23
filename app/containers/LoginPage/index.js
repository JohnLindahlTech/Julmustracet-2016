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
import { connect } from 'react-redux';
import messages from './messages';
import Page from '../../components/Page';
import { loginRequest } from '../auth/actions';
import selectLogin from '../auth/selectors';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (<Page messages={messages} >
      <button onClick={this.props.login}>Login</button>
    </Page>);
  }

}

const mapStateToProps = selectLogin();

function mapDispatchToProps(dispatch) {
  return {
    login: () => {
      const username = '';
      const password = '';
      dispatch(loginRequest({ username, password }));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
