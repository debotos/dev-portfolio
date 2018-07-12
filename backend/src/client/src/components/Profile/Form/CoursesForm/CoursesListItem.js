import React, { Component } from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { connect } from 'react-redux';
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
  updateCourses,
  deleteCourses
} from '../../../../redux/actions/profileActions';
import validateCoursesInput from './validateCoursesInput';

class CoursesListItem extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        deleteButtonWorkingState: false,
        submitButtonWorkingState: false,
        disabled: nextProps.data.current ? nextProps.data.current : false,
        title: nextProps.data.title,
        who_give: nextProps.data.who_give,
        from: nextProps.data.from
          ? nextProps.data.from.split('T')[0]
          : moment().format('YYYY-MM-DD'),
        to: nextProps.data.to ? nextProps.data.to.split('T')[0] : '',
        current: nextProps.data.current ? nextProps.data.current : false,
        description: nextProps.data.description
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data.title ? this.props.data.title : '',
      who_give: this.props.data.who_give ? this.props.data.who_give : '',
      from: this.props.data.from
        ? this.props.data.from.split('T')[0]
        : moment().format('YYYY-MM-DD'),
      to: this.props.data.to ? this.props.data.to.split('T')[0] : '',
      current: this.props.data.current ? this.props.data.current : false,
      description: this.props.data.description
        ? this.props.data.description
        : '',
      errors: {},
      disabled: this.props.data.current ? this.props.data.current : false,
      toasts: [
        /* IToastProps[] */
      ],
      submitButtonWorkingState: false,
      deleteButtonWorkingState: false
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
    }
  };

  onSubmit(e) {
    // Submit is for updating
    e.preventDefault();
    this.setState({
      submitButtonWorkingState: true,
      errors: {}
    });
    const { errors, isValid } = validateCoursesInput(this.state);
    // Check Validation
    if (isValid) {
      const newCourseData = {
        title: this.state.title,
        who_give: this.state.who_give,
        from: this.state.from,
        to: this.state.current ? null : this.state.to,
        current: this.state.current,
        description: this.state.description
      };
      this.props.updateCourses(
        this.props.data._id,
        newCourseData,
        this.props.history
      );
      setTimeout(() => {
        this.setState({ submitButtonWorkingState: false });
        this.addToast({
          icon: 'tick',
          intent: Intent.SUCCESS,
          message: 'Successful! Course Updated!'
        });
      }, 500);
    } else {
      this.setState({ errors });
      this.setState({ submitButtonWorkingState: false });
      this.addToast({
        icon: 'tick',
        intent: Intent.WARNING,
        message: 'Error! Valid input please!'
      });
    }
  }

  handleItemDelete = () => {
    // @todo : add a confirm dialog
    this.setState({ deleteButtonWorkingState: true });
    this.props.deleteCourses(this.props.data._id);
    setTimeout(() => {
      this.setState({ deleteButtonWorkingState: false });
    }, 2000);
  };
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
      <Card interactive={true} elevation={Elevation.TWO}>
        <h2 style={{ textAlign: 'center' }}>{this.props.number}</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
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
                  placeholder="Title eg. Project Manager"
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup
                helperText={errors.who_give ? errors.who_give : ''}
                label="Course Instructor/Author/Website"
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
                  placeholder="eg. Udemy Course / By Debotos Das"
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
              {this.state.submitButtonWorkingState ||
              this.state.deleteButtonWorkingState ? (
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
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <button
                    onClick={this.onSubmit}
                    style={{ padding: '8px' }}
                    className="pt-button pt-intent-success"
                  >
                    Update<span className="pt-icon-standard pt-icon-tick-circle pt-align-right" />
                  </button>
                  <button
                    onClick={this.handleItemDelete}
                    type="button"
                    className="pt-button pt-intent-danger"
                  >
                    Delete<span className="pt-icon-standard pt-icon-trash pt-align-right" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <Toaster position={Position.TOP} ref={this.refHandlers.toaster}>
              {/* "Toasted!" will appear here after clicking button. */}
              {this.state.toasts.map(toast => <Toast {...toast} />)}
            </Toaster>
          </div>
        </div>
      </Card>
    );
  }
}

export default connect(null, {
  updateCourses,
  deleteCourses
})(withRouter(CoursesListItem));
