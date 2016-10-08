/**
*
* NavMenuItem
*
*/

import React, { PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';

import styles from './styles.css';

function NavMenuItem(props) {
  const {
    to,
    children,
  } = props;
  return (
    <MenuItem primaryText={<Link to={to} className={styles.navMenuItem}>{ children }</Link>} />
  );
}

NavMenuItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

export default NavMenuItem;
