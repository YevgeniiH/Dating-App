import React, { Component } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar isAuth={false} menuClicked={null} />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}
