/**
*
* Menu
*
*/

import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import selectLoggedIn from 'containers/auth/selectors';
import { logout } from 'containers/auth/actions';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionBack from 'material-ui/svg-icons/image/navigate-before';
import { Grid, Row, Col } from 'react-bem-grid';
import { locationShape } from 'react-router/lib/PropTypes';
import messages from './messages';


import styles from './styles.css';

class JulMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      title,
      loggedIn,
      doLogout,
      isAddAllowed,
      location: {
        pathname,
      },
    } = this.props;

    const icon = pathname === '/' ? <ActionHome /> : <ActionBack />;
    return (
      <nav>
        <AppBar
          title={title}
          iconElementLeft={renderPrimaryMenuButton(icon)}
          iconElementRight={loggedIn ? renderLogout(doLogout) : renderLogin()}
        />
        {isAddAllowed ? <AddButton /> : null}
      </nav>
    );
  }
}

function renderPrimaryMenuButton(icon) {
  return (<IconButton containerElement={<Link to="/" />}>{icon}</IconButton>); // eslint-disable-line jsx-a11y/anchor-has-content
}

function AddButton() {
  return (
    <Grid>
      <Row>
        <Col>
          <FloatingActionButton
            className={styles['add-button']}
            containerElement={<Link to="/add" />} // eslint-disable-line jsx-a11y/anchor-has-content
          >
            <ContentAdd />
          </FloatingActionButton>
        </Col>
      </Row>

    </Grid>
  );
}

function renderLogin() {
  return (<FlatButton
    containerElement={<Link to="/login" />} // eslint-disable-line jsx-a11y/anchor-has-content
    label={<FormattedMessage {...messages.login} />}
  />);
}

function renderLogout(doLogout) {
  return (<FlatButton label={<FormattedMessage {...messages.logout} />} onClick={doLogout} />);
}

JulMenu.propTypes = {
  title: PropTypes.node,
  loggedIn: PropTypes.bool,
  doLogout: PropTypes.func,
  isAddAllowed: PropTypes.bool,
  location: locationShape,
};


const mapStateToProps = selectLoggedIn();

function mapDispatchToProps(dispatch) {
  return {
    doLogout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JulMenu);
