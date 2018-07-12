import React, { Component } from 'react';
import { Card, Elevation } from '@blueprintjs/core';

import AddCourses from '../Form/CoursesForm/AddCourses';
import CoursesList from '../Form/CoursesForm/CoursesList';

class CoursesPanel extends Component {
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
            <AddCourses />
          </Card>
        </div>
        <div>
          <CoursesList />
        </div>
      </div>
    );
  }
}

export default CoursesPanel;
