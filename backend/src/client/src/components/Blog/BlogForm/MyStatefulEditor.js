import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';

class MyStatefulEditor extends Component {
  static propTypes = {
    onBodyChange: PropTypes.func
  };

  state = {
    value: this.props.initialValue
      ? RichTextEditor.createValueFromString(this.props.initialValue, 'html')
      : RichTextEditor.createEmptyValue()
  };

  onChange = value => {
    this.setState({ value });
    if (this.props.onBodyChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onBodyChange(value.toString('html'));
    }
  };

  render() {
    return (
      <RichTextEditor
        editorClassName="react-rte-blog"
        placeholder="Body of the Blog (Click me to start writing)"
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

export default MyStatefulEditor;
