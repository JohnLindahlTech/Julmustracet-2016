/*
 *
 * BrandTopList
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import selectBrandTopList from './selectors';
import TopList from '../../components/TopList';
import messages from './messages';
import { loadBrands } from './actions';

export class BrandTopList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadBrands();
  }
  render() {
    const {
      brands,
    } = this.props;
    return (
      <div>
        <h2><FormattedMessage {...messages.header} /></h2>
        <TopList rows={brands} name />
      </div>
    );
  }
}

BrandTopList.propTypes = {
  loadBrands: PropTypes.func,
  brands: PropTypes.array,
};

const mapStateToProps = selectBrandTopList();

function mapDispatchToProps(dispatch) {
  return {
    loadBrands: () => dispatch(loadBrands()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandTopList);
