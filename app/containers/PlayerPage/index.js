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
    loadPlayer: PropTypes.func,
    player: PropTypes.object,
    location: locationShape,
  }

  componentDidMount() {
    this.props.loadPlayer();
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
    loadPlayer: () => dispatch(loadPlayer()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
