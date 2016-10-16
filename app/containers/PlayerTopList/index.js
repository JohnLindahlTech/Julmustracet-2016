/*
 *
 * PlayerTopList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectPlayerTopList from './selectors';
import { FormattedMessage } from 'react-intl';
import TopList from '../../components/TopList';
import messages from './messages';
import { loadPlayers } from './actions';

export class PlayerTopList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadPlayers();
  }
  render() {
    const {
      players,
    } = this.props;
    return (
      <div>
        <h2><FormattedMessage {...messages.header} /></h2>
        <TopList rows={players} username />
      </div>
    );
  }
}

const mapStateToProps = selectPlayerTopList();

function mapDispatchToProps(dispatch) {
  return {
    loadPlayers: () => dispatch(loadPlayers()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTopList);
