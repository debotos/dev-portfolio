import React, { Component } from 'react';
import { Card, Elevation } from '@blueprintjs/core';

import AddExperience from './AddExperience';
import ExperiencesList from './ExperiencesList';

class ExperiencesWrapper extends Component {
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
            <AddExperience />
          </Card>
        </div>
        <div>
          <ExperiencesList />
        </div>
      </div>
    );
  }
}

export default ExperiencesWrapper;
