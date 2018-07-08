import React, { Component } from 'react';
import { Card, Elevation } from '@blueprintjs/core';

import InfoForm from '../Form/InfoForm/InfoForm';

export default class InfoPanel extends Component {
  render() {
    return (
      <Card interactive={true} elevation={Elevation.TWO}>
        <InfoForm />
      </Card>
    );
  }
}
