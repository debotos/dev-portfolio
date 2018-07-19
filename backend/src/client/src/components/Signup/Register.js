import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Intent, Position, Toast, Toaster } from '@blueprintjs/core';

import { registerUser } from '../../redux/actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import './signUp.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      toasts: [
        /* IToastProps[] */
      ]
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };

  showToast = () => {
    if (Object.keys(this.state.errors).length === 0) {
      this.toaster.show({
        icon: 'tick',
        intent: Intent.SUCCESS,
        message: 'Successful! Please Log In.'
      });
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    setTimeout(() => {
      this.showToast();
    }, 2100);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="form-page">
        <div className="container">
          <div className="signup-form">
            <div className="signup-title">
              Sign <span style={{ color: '#15CD72' }}>Up</span>
            </div>
            <p className="lead text-center">
              Create your Portfolio Data Service
            </p>
            <div className="signup-input-parts">
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  className="signup-input"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  className="signup-input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  className="signup-input"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  className="signup-input"
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                {errors.other && (
                  <div style={{ color: 'red' }} className="invalid-feedback">
                    {errors.other}
                  </div>
                )}
                <input
                  type="submit"
                  value="Sign Up"
                  className="signup-input button"
                />
              </form>
              <Link className="nav-link" to="/signup">
                Already Have Account? Login
              </Link>
            </div>
          </div>
        </div>
        <Toaster position={Position.TOP} ref={this.refHandlers.toaster}>
          {/* "Toasted!" will appear here after clicking button. */}
          {this.state.toasts.map(toast => <Toast {...toast} />)}
        </Toaster>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
