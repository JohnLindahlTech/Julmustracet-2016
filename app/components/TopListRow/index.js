/**
*
* TopListRow
*
*/

import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { FormattedNumber } from 'react-intl';

const numberCell = {
  paddingLeft: '5px',
  paddingRight: '5px',
  textAlign: 'right',
  width: '40px',
};
const positionCell = Object.assign({}, numberCell, { textAlign: 'left' });

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
      <TableRowColumn style={positionCell}><FormattedNumber value={position} maximumFractionDigits={0} /></TableRowColumn>
      <TableRowColumn>{usernameAsName ? username : name}</TableRowColumn>
      <TableRowColumn style={numberCell}><FormattedNumber value={daily} maximumFractionDigits={2} /></TableRowColumn>
      <TableRowColumn style={numberCell}><FormattedNumber value={total} maximumFractionDigits={2} /></TableRowColumn>
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
