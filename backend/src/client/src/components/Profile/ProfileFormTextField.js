import React from 'react';

import { FormGroup } from '@blueprintjs/core';

export default props => (
  <FormGroup
    className="pt-form-group"
    helperText="Helper text with details..."
    label="Label A"
    labelFor="text-input"
    requiredLabel={true}
  >
    <input
      id="text-input"
      className="pt-input"
      style={{ width: '300px' }}
      placeholder="Placeholder text"
    />
  </FormGroup>
);
