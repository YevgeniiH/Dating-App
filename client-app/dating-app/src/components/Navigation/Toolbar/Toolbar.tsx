import React, { Component } from "react";
import AccountService from "../../../services/AccountService";
import Account from "../Account/Account";
import LoginForm from "../LoginForm/LoginForm";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";

type ToolbarState = {
  isLoggedIn: boolean;
  loginInfo: {
    username: string;
    password: string;
  };
};

export default class Toolbar extends Component<{}, ToolbarState> {
  readonly state: Readonly<ToolbarState> = {
    loginInfo: {
      username: "",
      password: "",
    },
    isLoggedIn: false,
  };

  login = (event: any) => {
    AccountService.login(this.state.loginInfo)
      .then((result) => {
        this.setState({ isLoggedIn: true });
        console.log(this.state.isLoggedIn);
        console.log(result.data);
      })
      .catch((err) => console.log(err));
    event.preventDefault();
  };

  logout = (event: any) => {
    this.setState({
      isLoggedIn: false,
      loginInfo: {
        username: "",
        password: "",
      },
    });
    event.preventDefault();
  };

  handleInputChange = (event: any) => {
    const value = event.target.value;
    if (event.target.type === "text") {
      this.setState((prevState) => ({
        loginInfo: {
          // object that we want to update
          password: prevState.loginInfo.password, // keep all other key-value pairs
          username: value, // update the value of specific key
        },
      }));
    } else {
      this.setState((prevState) => ({
        loginInfo: {
          // object that we want to update
          username: prevState.loginInfo.username, // keep all other key-value pairs
          password: value, // update the value of specific key
        },
      }));
    }
  };

  render() {
    let loginForm = null;
    if (!this.state.isLoggedIn) {
      loginForm = (
        <LoginForm
          loginInfo={this.state.loginInfo}
          login={this.login}
          handleInputChange={this.handleInputChange}
        />
      );
    }
    return (
      <header className={classes.Toolbar}>
        <a href='/'>Dating App</a>
        <div>Logo</div>
        <NavigationItems isLoggedIn={this.state.isLoggedIn} />
        {loginForm}
        <Account
          isLoggedIn={this.state.isLoggedIn}
          loginInfo={this.state.loginInfo}
          logout={this.logout}
        />
      </header>
    );
  }
}
