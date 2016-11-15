/**
*
* TopListRow
*
*/

import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { FormattedNumber } from 'react-intl';

import styles from './styles.css';


function TopListRow(props) {
  const {
    position,
    username,
    name,
    daily,
    total,
    usernameAsName,
  } = props;
  return (
    <TableRow>
      <TableRowColumn className={styles.positionCell}><FormattedNumber value={position} maximumFractionDigits={0} /></TableRowColumn>
      <TableRowColumn>{usernameAsName ? username : name}</TableRowColumn>
      <TableRowColumn className={styles.numberCell}><FormattedNumber value={daily} maximumFractionDigits={2} /></TableRowColumn>
      <TableRowColumn className={styles.numberCell}><FormattedNumber value={total} maximumFractionDigits={2} /></TableRowColumn>
    </TableRow>
  );
}

TopListRow.propTypes = {
  position: PropTypes.number,
  username: PropTypes.string,
  name: PropTypes.string,
  daily: PropTypes.number,
  total: PropTypes.number,
  usernameAsName: PropTypes.bool,
};

export default TopListRow;
