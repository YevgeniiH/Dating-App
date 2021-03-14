import React, { Component } from "react";
import classes from "./LoginForm.module.css";

type LoginFormProps = {
  login: any;
  handleInputChange: any;
  loginInfo: {
    username: string;
    password: string;
  };
};

class LoginForm extends Component<LoginFormProps> {
  render() {
    return (
      <form
        onSubmit={this.props.login}
        autoComplete='off'
        className={classes.LoginForm}>
        <input
          type='text'
          placeholder='Username'
          value={this.props.loginInfo.username}
          onChange={this.props.handleInputChange}
        />
        <input
          type='password'
          placeholder='Password'
          value={this.props.loginInfo.password}
          onChange={this.props.handleInputChange}
        />
        <button type='submit'>Login</button>
      </form>
    );
  }
}

export default LoginForm;
