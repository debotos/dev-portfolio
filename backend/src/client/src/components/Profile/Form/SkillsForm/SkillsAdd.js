import React, { Component } from 'react';
import { FormGroup, Intent, Position, Toast, Toaster } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { addSkills } from '../../../../redux/actions/profileActions';

class SkillsAdd extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };

  addToast = toastData => {
    if (Object.keys(this.state.errors).length === 0) {
      this.toaster.show(toastData);
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      skillsArray: this.props.profile.profile.skills
        ? this.props.profile.profile.skills
        : [],
      errors: {},
      submitButtonWorkingState: false,
      newSkillTitle: '',
      newSkillPrecentage: '',
      toasts: [
        /* IToastProps[] */
      ]
    };
  }
  onSubmit = e => {
    e.preventDefault();
    this.setState({ errors: {} });
    this.setState({
      submitButtonWorkingState: true
    });
    const newSkillData = {
      title: this.state.newSkillTitle,
      percentage: this.state.newSkillPrecentage
    };
    this.props.addSkills(newSkillData, this.props.history);
    setTimeout(() => {
      this.setState({ submitButtonWorkingState: false });
      this.addToast({
        icon: 'tick',
        intent: Intent.SUCCESS,
        message: 'Successful! New Skill Added!'
      });
      this.setState({
        newSkillTitle: '',
        newSkillPrecentage: ''
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
        <form onSubmit={this.onSubmit}>
          <div>
            <FormGroup
              helperText={errors.title ? errors.title : ''}
              label="Skill"
              labelFor="newSkillTitle"
              requiredLabel={true}
              className="pt-form-group"
            >
              <input
                onChange={this.onChange}
                style={{ width: '400px' }}
                value={this.state.newSkillTitle}
                className="pt-input .pt-round "
                id="newSkillTitle"
                placeholder="Skill name or Technology"
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup
              helperText={errors.percentage ? errors.percentage : ''}
              label="Percentage eg. 60"
              labelFor="newSkillPrecentage"
              requiredLabel={true}
              className="pt-form-group"
            >
              <input
                type="number"
                value={this.state.newSkillPrecentage}
                onChange={this.onChange}
                style={{ width: '400px' }}
                className="pt-input .pt-round "
                id="newSkillPrecentage"
                placeholder="Enter Percentage."
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

SkillsAdd.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addSkills })(withRouter(SkillsAdd));
