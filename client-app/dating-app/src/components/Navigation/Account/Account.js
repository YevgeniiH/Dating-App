import React, { Component } from "react";
import { connect } from "react-redux";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import * as actions from "../../../store/actions/index";
import classes from "./Account.module.css";

class Account extends Component {
  logoutHandler = (event) => {
    event.preventDefault();
    this.props.onLogout();
  };

  render() {
    const title = "Welcome " + this.props.username;
    return (
      <div className={classes.Account}>
        <DropdownButton
          title={title}
          menuAlign='right'
          id='account_dropdown'
          variant='flat'>
          <Dropdown.Item>Edit profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={this.logoutHandler}>Logout</Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
