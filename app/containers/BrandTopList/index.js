/*
 *
 * BrandTopList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectBrandTopList from './selectors';
import { FormattedMessage } from 'react-intl';
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

const mapStateToProps = selectBrandTopList();

function mapDispatchToProps(dispatch) {
  return {
    loadBrands: () => dispatch(loadBrands()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandTopList);
