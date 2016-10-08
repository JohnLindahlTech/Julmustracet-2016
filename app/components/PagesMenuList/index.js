/**
*
* PagesMenuList
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import IconMenu from 'material-ui/IconMenu';

import IconButton from 'material-ui/IconButton/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { white } from 'material-ui/styles/colors';
import NavMenuItem from '../NavMenuItem';
import messages from './messages';

function PagesMenuList(props) {
  const {
    menu,
    items,
  } = props;
  return (
    <IconMenu
      {...menu}
      iconButtonElement={
        <IconButton><MenuIcon color={white} /></IconButton>
      }

      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    >
    {items.map((item) => (<NavMenuItem {...item} key={item.to} />))}
    </IconMenu>
  );
}
PagesMenuList.propTypes = {
  menu: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.object,
  ),
};
PagesMenuList.defaultProps = {
  menu: {},
  items: [
    { to: '/', children: <FormattedMessage {...messages.home} /> },
    { to: '/leaderboard', children: <FormattedMessage {...messages.leaderboard} /> },
    { to: '/brands', children: <FormattedMessage {...messages.brands} /> },
    { to: '/about', children: <FormattedMessage {...messages.about} /> },
    { to: '/login', children: <FormattedMessage {...messages.login} /> },
    { to: '/signup', children: <FormattedMessage {...messages.signup} /> },
    { to: '/add', children: <FormattedMessage {...messages.add} /> },
    { to: '/BROKEN', children: 'BROKEN!' },
  ],
};
export default PagesMenuList;
