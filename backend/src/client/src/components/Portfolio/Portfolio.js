import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {
  getCurrentPortfolio,
  getCurrentUserPortfolioCategories
} from '../../redux/actions/portfolioActions';

import PortfolioTab from './Tabs';
class Portfolio extends Component {
  componentDidMount() {
    this.props.getCurrentUserPortfolioCategories();
    this.props.getCurrentPortfolio();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (
  //     nextProps.portfolio.portfolio === null &&
  //     nextProps.portfolio.categories === null &&
  //     this.props.portfolio.loading
  //   ) {
  //     this.props.history.push('/');
  //   }
  // }

  render() {
    const { portfolio, categories, loading } = this.props.portfolio;
    // console.log('Portfolio props => ', this.props.portfolio);
    return portfolio === null || categories === null || loading ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Spinner />
      </div>
    ) : (
      <div
        style={{
          display: 'flex',
          padding: '0 1rem'
        }}
      >
        <PortfolioTab portfolio={portfolio} />
      </div>
    );
  }
}

Portfolio.propTypes = {
  getCurrentPortfolio: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  portfolio: state.portfolio
});

export default connect(mapStateToProps, {
  getCurrentPortfolio,
  getCurrentUserPortfolioCategories
})(Portfolio);
