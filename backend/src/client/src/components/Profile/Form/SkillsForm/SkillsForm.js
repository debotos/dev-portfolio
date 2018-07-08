import React, { Component } from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import SkillsAdd from './SkillsAdd';
import SkillsList from './SkillsList';

export default class SkillsForm extends Component {
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
            <SkillsAdd />
          </Card>
        </div>
        <div>
          <SkillsList />
        </div>
      </div>
    );
  }
}
