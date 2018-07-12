import React, { Component } from 'react';
import { Card, Elevation } from '@blueprintjs/core';

import WhatIDoAdd from './What_I_Do_Add';
import WhatIDoList from './What_I_Do_List';

class What_I_Do_Wrapper extends Component {
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
            <WhatIDoAdd />
          </Card>
        </div>
        <div>
          <WhatIDoList />
        </div>
      </div>
    );
  }
}
export default What_I_Do_Wrapper;
