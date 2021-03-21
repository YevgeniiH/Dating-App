import React, { Component } from "react";
import classes from "./NavigationItems.module.css";

export default class NavigationItems extends Component {
  render() {
    const navigation = this.props.isLoggedIn ? (
      <ul className={classes.NavigationItems}>
        <li key='1' className={classes.NavigationItem}>
          <a href='/'>Matches</a>
        </li>
        <li key='2' className={classes.NavigationItem}>
          <a href='/'>Lists</a>
        </li>
        <li key='3' className={classes.NavigationItem}>
          <a href='/'>Messages</a>
        </li>
      </ul>
    ) : null;

    return <React.Fragment>{navigation}</React.Fragment>;
  }
}
