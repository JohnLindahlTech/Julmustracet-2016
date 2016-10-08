/**
*
* PagesMenuList
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { white } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import messages from './messages';
import styles from './styles.css';


function PagesMenuList(props) {
  return (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton><MenuIcon color={white} /></IconButton>
      }

      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    >
      <MenuItem primaryText={<Link to="/" className={styles.menuLink}><FormattedMessage {...messages.home} /></Link>} />
      <MenuItem primaryText={<Link to="contenstants" className={styles.menuLink}><FormattedMessage {...messages.contenstants} /></Link>} />
      <MenuItem primaryText={<Link to="/brands" className={styles.menuLink}><FormattedMessage {...messages.brands} /></Link>} />
      <MenuItem primaryText={<Link to="/about" className={styles.menuLink}><FormattedMessage {...messages.about} /></Link>} />
      <MenuItem primaryText={<Link to="/add" className={styles.menuLink}><FormattedMessage {...messages.add} /></Link>} />
    </IconMenu>
  );
}

export default PagesMenuList;
