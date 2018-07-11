import React, { Component } from 'react';
import { Card, Elevation } from '@blueprintjs/core';

import AddEducation from '../Form/EducationForm/AddEducation';
import EducationList from '../Form/EducationForm/EducationList';

class EducationPanel extends Component {
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
            <AddEducation />
          </Card>
        </div>
        <div>
          <EducationList />
        </div>
      </div>
    );
  }
}

export default EducationPanel;
