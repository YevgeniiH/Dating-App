import React, { Component } from "react";
import Account from "../Account/Account";
import LoginForm from "../LoginForm/LoginForm";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";
import { connect } from "react-redux";

class Toolbar extends Component {
  render() {
    let loginForm = null;
    if (!this.props.isAuthenticated) {
      loginForm = <LoginForm />;
    }
    return (
      <header className={classes.Toolbar}>
        <a href='/' className={classes.ToolbarHeaderLink}>
          Dating App
        </a>
        <div>Logo</div>
        <NavigationItems isLoggedIn={this.props.isAuthenticated} />
        {loginForm}
        {this.props.isAuthenticated ? (
          <Account username={this.props.userName} />
        ) : null}
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    userName: state.auth.userId,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

export default connect(mapStateToProps)(Toolbar);
