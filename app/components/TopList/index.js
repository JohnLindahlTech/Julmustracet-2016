/**
*
* TopList
*
*/

import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import TopListRow from '../TopListRow';


function TopList({ rows, username }) {
  return (
    <Table selectable={false}>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        enableSelectAll={false}
      >
        <TableRow>
          <TableHeaderColumn><FormattedMessage {...messages.position} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages[username ? 'username' : 'name']} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.daily} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.total} /></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        showRowHover
        stripedRows
      >
        {rows.length ? rows.map((row) => (<TopListRow key={row.position} {...row} usernameAsName={username} />)) : renderEmpty()}
      </TableBody>
    </Table>
  );
}

TopList.propTypes = {
  rows: PropTypes.array,
  username: PropTypes.bool,
};

TopList.defaultProps = {
  rows: [],
};

function renderEmpty() {
  return (
    <TableRow>
      <TableRowColumn><FormattedMessage {...messages.empty} /></TableRowColumn>
    </TableRow>
  );
}

export default TopList;
