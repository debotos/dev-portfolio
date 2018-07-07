import React from 'react';

import { FormGroup } from '@blueprintjs/core';

export default ({ data, onChange }) => (
  <FormGroup
    className={data.className}
    helperText={data.helperText}
    label={data.label}
    labelFor={data.labelFor}
    requiredLabel={data.requiredLabel}
  >
    <input
      type={data.input.type}
      value={data.input.value}
      id={data.input.id}
      className={data.input.className}
      style={data.input.style}
      placeholder={data.input.placeholder}
      onChange={onChange}
    />
  </FormGroup>
);
