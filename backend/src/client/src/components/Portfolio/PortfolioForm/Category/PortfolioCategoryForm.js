import React, { Component } from 'react';
import { Card, Elevation } from '@blueprintjs/core';

import CategoryList from './CategoryList';
import CategoryAdd from './CategoryAdd';

export default class PortfolioCategoryForm extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ marginRight: '10px' }}>
          <Card interactive={true} elevation={Elevation.TWO}>
            <CategoryAdd />
          </Card>
        </div>
        <div>
          <CategoryList />
        </div>
      </div>
    );
  }
}
