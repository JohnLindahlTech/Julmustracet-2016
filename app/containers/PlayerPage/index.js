/*
 *
 * PlayerPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bem-grid';
import { locationShape } from 'react-router/lib/PropTypes';
import Page from 'components/Page';
import ProfileView from 'components/ProfileView';
import selectPlayerPage from './selectors';
import messages from './messages';
import { loadPlayer } from './actions';

export class PlayerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    getPlayer: PropTypes.func,
    player: PropTypes.object,
    location: locationShape,
    params: PropTypes.object,
  }

  componentDidMount() {
    const {
      getPlayer,
      params: {
        username,
      } = {},
    } = this.props;
    if (username) {
      getPlayer(username);
    }
  }

  render() {
    const {
      player,
      location,
    } = this.props;
    return (
      <Page messages={messages} isAddAllowed location={location}>
        <Row xsCenter>
          <Col xs={12}>
            <ProfileView profile={player} />
          </Col>
        </Row>
      </Page>
    );
  }
}

const mapStateToProps = selectPlayerPage();

function mapDispatchToProps(dispatch) {
  return {
    getPlayer: (username) => dispatch(loadPlayer(username)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
