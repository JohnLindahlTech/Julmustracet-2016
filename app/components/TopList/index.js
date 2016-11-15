/**
*
* TopList
*
*/

import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { FormattedMessage } from 'react-intl';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Row } from 'react-bem-grid';
import messages from './messages';
import TopListRow from '../TopListRow';

import styles from '../TopListRow/styles.css';

function TopList({ rows, username, title }) {
  return (
    <Row style={{ margin: '15px' }}>
      <Card>
        <CardTitle title={title} />
        <CardText>
          <Table selectable={false}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn className={styles.positionCell}><FormattedMessage {...messages.position} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages[username ? 'username' : 'name']} /></TableHeaderColumn>
                <TableHeaderColumn className={styles.numberCell}><FormattedMessage {...messages.daily} /></TableHeaderColumn>
                <TableHeaderColumn className={styles.numberCell}><FormattedMessage {...messages.total} /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              showRowHover
              stripedRows
            >
              {rows.length ? rows.map((row) => (<TopListRow key={`${row.position}-${row.name}`} {...row} usernameAsName={username} />)) : renderEmpty()}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    </Row>
  );
}

TopList.propTypes = {
  rows: PropTypes.array,
  username: PropTypes.bool,
  title: PropTypes.node,
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
