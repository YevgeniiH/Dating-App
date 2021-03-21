import React, { Component } from "react";
import Account from "../../../containers/Auth/Account/Account";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";
import { connect } from "react-redux";

class Toolbar extends Component {
  render() {
    let authForm = null;
    if (this.props.isAuthenticated) {
      authForm = <Account username={this.props.userName} />;
    }
    return (
      <header className={classes.Toolbar}>
        <div>Logo</div>
        <NavigationItems isAuthenticated={this.props.isAuthenticated} />
        {authForm}
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
