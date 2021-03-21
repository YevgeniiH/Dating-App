import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

class Account extends Component {
  state = {
    dropdownOpen: false,
  };

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    return (
      <div>
        {this.props.isLoggedIn && (
          <Dropdown onToggle={this.toggle}>
            <Dropdown.Toggle>
              Welcome {this.props.loginInfo.username}
            </Dropdown.Toggle>
            {this.state.dropdownOpen && (
              <Dropdown.Menu align='right'>
                <Dropdown.Item>Edit profile</Dropdown.Item>
                <Dropdown.Item divider />
                <Dropdown.Item onClick={this.props.logout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            )}
          </Dropdown>
        )}
      </div>
    );
  }
}

export default Account;