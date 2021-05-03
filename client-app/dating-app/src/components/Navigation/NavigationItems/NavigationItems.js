import React, { Component } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

export default class NavigationItems extends Component {
  render() {
    const nav = (
      <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>
          Dating App
        </NavigationItem>
        {this.props.isAuthenticated ? (
          <ul className={classes.NavigationItems}>
            <NavigationItem link='/members'>Matches</NavigationItem>
            <NavigationItem link='/lists'>Lists</NavigationItem>
            <NavigationItem link='/messages'>Messages</NavigationItem>
          </ul>
        ) : null}
        {!this.props.isAuthenticated ? (
          <NavigationItem link='/auth'>Authenticate</NavigationItem>
        ) : null}
      </ul>
    );
    return <React.Fragment>{nav}</React.Fragment>;
  }
}
