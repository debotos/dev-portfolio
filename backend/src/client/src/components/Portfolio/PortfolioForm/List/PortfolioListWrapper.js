import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListItem from './ListItem';
import { deletePortfolio } from '../../../../redux/actions/portfolioActions';

class ListWrapper extends Component {
  render() {
    let { portfolio } = this.props.portfolio.portfolio;
    portfolio = portfolio ? portfolio : [];
    return (
      <div>
        {portfolio.length > 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            {portfolio.map((singleItem, index) => (
              <ListItem
                deletePortfolio={this.props.deletePortfolio}
                data={singleItem}
                number={index + 1}
                key={index}
              />
            ))}
          </div>
        ) : (
          <div>No Portfolio Item</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.portfolio
  };
};

export default connect(mapStateToProps, { deletePortfolio })(ListWrapper);
