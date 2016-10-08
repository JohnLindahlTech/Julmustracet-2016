/**
*
* NavMenuItem
*
*/

import React, { PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';

import styles from './styles.css';

export default class NavMenuItem extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    to: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const {
      to,
      children,
    } = this.props;
    return (
      <MenuItem primaryText={<Link to={to} className={styles.navMenuItem}>{ children }</Link>} />
    );
  }
}
