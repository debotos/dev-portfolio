import React from 'react';
import { Intent, Position, Toast, Toaster } from '@blueprintjs/core';

export default ({ data, deleteSkills, id }) => (
  <div style={{ display: 'flex' }}>
    {console.log(data.title + ' : ' + id)}
    <div style={{ padding: '5px' }}>
      <input
        readOnly
        value={data.title}
        className="pt-input"
        style={{ width: '300px' }}
      />
    </div>
    <div style={{ padding: '5px' }}>
      <input
        readOnly
        value={data.percentage + ' %'}
        className="pt-input"
        style={{ width: '100px' }}
      />
    </div>
    <div style={{ padding: '5px' }}>
      <button
        onClick={id => deleteSkills(id)}
        type="button"
        className="pt-button pt-intent-danger"
      >
        Delete<span className="pt-icon-standard pt-icon-trash pt-align-right" />
      </button>
    </div>
  </div>
);
