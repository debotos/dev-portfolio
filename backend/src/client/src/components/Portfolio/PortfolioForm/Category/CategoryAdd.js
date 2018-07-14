import React, { Component } from 'react';
import { FormGroup, Intent, Position, Toast, Toaster } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  createCategory,
  clearErrors
} from '../../../../redux/actions/portfolioActions';

class CategoryAdd extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      } else {
        this.setState({ errors: {} });
      }
    }
  }
  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };

  addToast = toastData => {
    if (Object.keys(this.state.errors).length === 0) {
      this.toaster.show(toastData);
      this.props.clearErrors();
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      submitButtonWorkingState: false,
      category: '',
      toasts: [
        /* IToastProps[] */
      ]
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      submitButtonWorkingState: true,
      errors: {}
    });
    this.props.createCategory(
      { portfolio_categories: this.state.category },
      this.props.history
    );
    setTimeout(() => {
      this.setState({ submitButtonWorkingState: false });
      this.addToast({
        icon: 'tick',
        intent: Intent.SUCCESS,
        message: 'Successful! New Category Added!'
      });
    }, 500);
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>Add Category</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <FormGroup
              helperText={
                errors.portfolio_categories ? errors.portfolio_categories : ''
              }
              label="Category"
              labelFor="category"
              requiredLabel={true}
              className="pt-form-group"
            >
              <input
                onChange={this.onChange}
                style={{ width: '400px' }}
                value={this.state.category}
                className="pt-input .pt-round "
                id="category"
                placeholder="eg. Website"
              />
            </FormGroup>
          </div>
          <div>
            {this.state.submitButtonWorkingState ? (
              <div style={{ textAlign: 'center' }}>
                <div className="pt-spinner pt-small">
                  <div className="pt-spinner-svg-container">
                    <svg viewBox="0 0 100 100">
                      <path
                        className="pt-spinner-track"
                        d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"
                      />
                      <path
                        className="pt-spinner-head"
                        d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <input
                type="submit"
                value="Submit"
                className="pt-button pt-large pt-intent-success"
              />
            )}
          </div>
        </form>
        <div>
          <Toaster position={Position.TOP} ref={this.refHandlers.toaster}>
            {/* "Toasted!" will appear here after clicking button. */}
            {this.state.toasts.map(toast => <Toast {...toast} />)}
          </Toaster>
        </div>
      </div>
    );
  }
}

CategoryAdd.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createCategory, clearErrors })(
  withRouter(CategoryAdd)
);
