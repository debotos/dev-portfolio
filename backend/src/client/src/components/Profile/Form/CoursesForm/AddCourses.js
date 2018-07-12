import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  FormGroup,
  Checkbox,
  Intent,
  Position,
  Toast,
  Toaster,
  TextArea
} from '@blueprintjs/core';
import moment from 'moment';

import {
  addCourses,
  clearErrors
} from '../../../../redux/actions/profileActions';

class AddCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      who_give: '',
      from: moment().format('YYYY-MM-DD'),
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false,
      toasts: [
        /* IToastProps[] */
      ],
      submitButtonWorkingState: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }
  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };

  addToast = toastData => {
    if (Object.keys(this.state.errors).length === 0) {
      this.toaster.show(toastData);
      this.setState({
        title: '',
        who_give: '',
        from: moment().format('YYYY-MM-DD'),
        to: '',
        description: ''
      });
      this.props.clearErrors();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      } else {
        this.setState({ errors: {} });
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      submitButtonWorkingState: true,
      errors: {}
    });

    const courseData = {
      title: this.state.title,
      who_give: this.state.who_give,
      from: this.state.from,
      to: this.state.current ? null : this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addCourses(courseData, this.props.history);

    setTimeout(() => {
      this.setState({ submitButtonWorkingState: false });
      this.addToast({
        icon: 'tick',
        intent: Intent.SUCCESS,
        message: 'Successful! Course Added!'
      });
    }, 500);
  }

  onChange(e) {
    // console.log(`[${e.target.id}]: ${e.target.value}`);
    this.setState({ [e.target.id]: e.target.value });
  }
  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h4 style={{ textAlign: 'center' }}>Add Courses</h4>
        <form onSubmit={this.onSubmit}>
          <div>
            <FormGroup
              helperText={errors.title ? errors.title : ''}
              label="Title"
              labelFor="title"
              requiredLabel={true}
              className="pt-form-group"
            >
              <input
                onChange={this.onChange}
                style={{ width: '400px' }}
                value={this.state.title}
                className="pt-input .pt-round"
                id="title"
                placeholder="title eg. Advance AI Course"
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup
              helperText={errors.who_give ? errors.who_give : ''}
              label="Who Give It"
              labelFor="who_give"
              requiredLabel={true}
              className="pt-form-group"
            >
              <input
                onChange={this.onChange}
                style={{ width: '400px' }}
                value={this.state.who_give}
                className="pt-input .pt-round"
                id="who_give"
                placeholder="who_give It eg. Google"
              />
            </FormGroup>
          </div>
          {/* Date related */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <FormGroup
                label="From"
                labelFor="from"
                requiredLabel={true}
                className="pt-form-group"
                helperText={errors.from ? errors.from : ''}
              >
                <input
                  type="date"
                  id="from"
                  name="from"
                  className="pt-input"
                  value={this.state.from}
                  onChange={this.onChange}
                  min="2000-01-01"
                  max="2060-01-01"
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup
                label="To"
                labelFor="to"
                className="pt-form-group"
                helperText={errors.to ? errors.to : ''}
              >
                <input
                  type="date"
                  id="to"
                  name="to"
                  className="pt-input"
                  value={this.state.to}
                  onChange={this.onChange}
                  min="2000-01-01"
                  max="2060-01-01"
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
              </FormGroup>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Checkbox
                id="current"
                name="current"
                checked={this.state.current}
                value={this.state.current}
                label="Current"
                onChange={this.onCheck}
              />
            </div>
          </div>
          {/* Date related staff end */}
          <div>
            <FormGroup
              className="pt-form-group"
              helperText={errors ? errors.description : ''}
              label="Description"
              labelFor="description"
              requiredLabel={true}
            >
              <TextArea
                value={this.state.description}
                style={{ height: '105px' }}
                id="description"
                className="pt-large pt-fill"
                large={true}
                intent={Intent.PRIMARY}
                onChange={this.onChange}
                placeholder="Details/Description"
              />
            </FormGroup>
          </div>
          <div style={{ textAlign: 'center' }}>
            {this.state.submitButtonWorkingState ? (
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

AddCourses.propTypes = {
  addCourses: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addCourses, clearErrors })(
  withRouter(AddCourses)
);
