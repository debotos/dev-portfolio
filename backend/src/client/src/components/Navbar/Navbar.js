import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Intent,
  Position,
  Toast,
  Toaster,
  Navbar,
  NavbarDivider,
  NavbarGroup
} from '@blueprintjs/core';
import { logoutUser } from '../../redux/actions/authActions';
import { clearCurrentProfile } from '../../redux/actions/profileActions';

class NavBar extends React.Component {
  state = {
    toasts: [
      /* IToastProps[] */
    ]
  };

  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };

  showGoodByeToast = () => {
    this.toaster.show({
      icon: 'hand',
      intent: Intent.WARNING,
      message: 'Goodbye !'
    });
  };
  onLogoutClick(e) {
    e.preventDefault();
    this.showGoodByeToast();
    setTimeout(() => {
      this.props.clearCurrentProfile();
      this.props.logoutUser();
    }, 1000);
  }
  render() {
    return (
      <Navbar
        fixedToTop={true}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <NavbarGroup>
          {/* <NavbarHeading>Blueprint</NavbarHeading> */}
          <NavLink style={{ textDecoration: 'none' }} to="/dashboard">
            <Button className="pt-minimal" icon="person" text="Profile" />
          </NavLink>

          <NavbarDivider />
          <NavLink style={{ textDecoration: 'none' }} to="/dashboard/portfolio">
            <Button className="pt-minimal" icon="projects" text="Portfolio" />
          </NavLink>
          <NavbarDivider />
          <NavLink style={{ textDecoration: 'none' }} to="/dashboard/blog">
            <Button className="pt-minimal" icon="book" text="Blog" />
          </NavLink>
          <NavbarDivider />
          <Button
            className="pt-minimal"
            icon="log-out"
            onClick={this.onLogoutClick.bind(this)}
          />
        </NavbarGroup>
        <div>
          <Toaster position={Position.TOP} ref={this.refHandlers.toaster}>
            {/* "Toasted!" will appear here after clicking button. */}
            {this.state.toasts.map(toast => <Toast {...toast} />)}
          </Toaster>
        </div>
      </Navbar>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func
};

export default connect(null, { logoutUser, clearCurrentProfile })(NavBar);
