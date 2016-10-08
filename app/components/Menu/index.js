/**
*
* Menu
*
*/

import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { red900 } from 'material-ui/styles/colors';
import PagesMenuList from '../PagesMenuList';

class JulMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {
      title,
    } = this.props;

    return (
      <nav>
        <AppBar
          style={{ backgroundColor: red900 }}
          title={title}
          iconElementLeft={<PagesMenuList />}
        />
      </nav>
    );
  }
}

JulMenu.propTypes = {
  title: PropTypes.node,
};

export default JulMenu;
