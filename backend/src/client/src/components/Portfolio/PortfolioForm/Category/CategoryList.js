import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Elevation } from '@blueprintjs/core';

import { deleteCategory } from '../../../../redux/actions/portfolioActions';

import CategoryListItem from './CategoryListItem';

class CategoryList extends Component {
  render() {
    const { categories } = this.props.portfolio;
    const ListOfCategories = categories ? categories.portfolio_categories : [];

    return (
      <div>
        {ListOfCategories &&
          ListOfCategories.length > 0 && (
            <Card interactive={true} elevation={Elevation.TWO}>
              <h3 style={{ textAlign: 'center' }}>Catagories</h3>
              {ListOfCategories.map((singleItem, index) => (
                <CategoryListItem
                  deleteCategory={this.props.deleteCategory}
                  number={index + 1}
                  data={singleItem}
                  key={index}
                />
              ))}
            </Card>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  portfolio: state.portfolio
});

export default connect(mapStateToProps, { deleteCategory })(CategoryList);
