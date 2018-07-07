import React, { Component } from 'react';

import LoginForm from './LoginForm';
import './login.css';

class LoginPage extends Component {
  render() {
    return (
      <div className="form-page">
        <LoginForm />
      </div>
    );
  }
}
export default LoginPage;
