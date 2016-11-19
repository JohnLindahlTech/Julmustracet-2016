/**
*
* ProfileView
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage, FormattedNumber, FormattedDate } from 'react-intl';


import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import messages from './messages';

function ProfileView(props) {
  if (!props.profile) {
    return (<div>
      No data
    </div>);
  }
  const {
    profile: {
      username,
      name,
      position,
      total,
      daily,
      drinks,
    },
  } = props;
  return (

    <Card>
      <CardTitle
        title={username || name}
        subtitle={renderSubtitle({ total, daily, position })}
      />
      <CardText>
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn><FormattedMessage {...messages.date} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.brand} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.amount} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.delete} /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
            stripedRows
          >

            {drinks.map((drink) => <ProfileRow {...drink} key={drink.id} />)}
          </TableBody>
        </Table>
      </CardText>
    </Card>
  );
}

ProfileView.propTypes = {
  profile: PropTypes.object,
};

ProfileView.defaultProps = {
  drinks: [],
};

export default ProfileView;

function ProfileRow(drink) {
  const {
    date,
    amount,
    brand: {
      name,
    } = {},
  } = drink;
  return (
    <TableRow title={name}>
      <TableRowColumn><FormattedDate value={date} /></TableRowColumn>
      <TableRowColumn>{name}</TableRowColumn>
      <TableRowColumn><FormattedNumber value={amount} maximumFractionDigits={2} /></TableRowColumn>
      <TableRowColumn>TODO DELETE BUTTON</TableRowColumn>
    </TableRow>
  );
}

function renderSubtitle({ total, daily, position }) {
  const positionNumber = <FormattedNumber value={position} maximumFractionDigits={0} />;
  const totalNumber = <FormattedNumber value={total} maximumFractionDigits={2} />;
  const dailyNumber = <FormattedNumber value={daily} maximumFractionDigits={3} />;
  return (<FormattedMessage {...messages.subtitle} values={{ total: totalNumber, daily: dailyNumber, position: positionNumber }} />);
}

renderSubtitle.propTypes = {
  total: PropTypes.number,
  daily: PropTypes.number,
  position: PropTypes.number,
};
