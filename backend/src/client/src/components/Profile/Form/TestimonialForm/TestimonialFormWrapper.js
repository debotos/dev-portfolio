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
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ paddingRight: '30px', paddingBottom: '10px' }}>
          <Card interactive={true} elevation={Elevation.TWO}>
            <TestimonialAdd />
          </Card>
        </div>
        <div>
          <TestimonialList />
        </div>
      </div>
    );
  }
}

export default TestimonialFormWrapper;
