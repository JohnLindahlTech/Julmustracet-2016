/**
*
* ProfileView
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage, FormattedNumber, FormattedDate } from 'react-intl';


import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import messages from './messages';

const cellStyle = {
  paddingLeft: '5px',
  paddingRight: '5px',
};

const numberStyle = Object.assign({}, cellStyle, {
  textAlign: 'right',
});

function ProfileView(props) {
  if (!props.profile) {
    return (<div>
      <FormattedMessage {...messages.noData} />
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
    removeDrink,
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
              <TableHeaderColumn style={cellStyle}><FormattedMessage {...messages.date} /></TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}><FormattedMessage {...messages.brand} /></TableHeaderColumn>
              <TableHeaderColumn style={numberStyle}><FormattedMessage {...messages.amount} /></TableHeaderColumn>
              <TableHeaderColumn style={numberStyle}><FormattedMessage {...messages.delete} /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
            stripedRows
          >

            {drinks.map((drink) => <ProfileRow drink={drink} removeDrink={removeDrink} key={drink.id} />)}
          </TableBody>
        </Table>
      </CardText>
    </Card>
  );
}

ProfileView.propTypes = {
  profile: PropTypes.object,
  removeDrink: PropTypes.func,
};

ProfileView.defaultProps = {
  drinks: [],
};

export default ProfileView;

function ProfileRow(props) {
  const {
    drink: {
      date,
      id,
      amount,
      brand: {
        name,
      } = {},
    },
    removeDrink,
  } = props;
  return (
    <TableRow title={name}>
      <TableRowColumn style={cellStyle}><FormattedDate value={date} /></TableRowColumn>
      <TableRowColumn style={cellStyle}>{name}</TableRowColumn>
      <TableRowColumn style={numberStyle}><FormattedNumber value={amount} maximumFractionDigits={2} /></TableRowColumn>
      <TableRowColumn style={numberStyle}><IconButton onClick={() => removeDrink(id)}><ActionDelete /></IconButton></TableRowColumn>
    </TableRow>
  );
}

ProfileRow.propTypes = {
  drink: PropTypes.object,
  removeDrink: PropTypes.func,
};

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
