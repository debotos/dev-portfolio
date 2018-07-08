import React, { Component } from 'react';
import { Card, Elevation } from '@blueprintjs/core';

import TestimonialAdd from './TestimonialAdd';
import TestimonialList from './TestimonialList';

class TestimonialFormWrapper extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <div style={{ paddingRight: '30px' }}>
          <Card interactive={true} elevation={Elevation.TWO}>
            <TestimonialAdd />
          </Card>
        </div>
        <div>
          <Card interactive={true} elevation={Elevation.TWO}>
            <TestimonialList />
          </Card>
        </div>
      </div>
    );
  }
}

export default TestimonialFormWrapper;
