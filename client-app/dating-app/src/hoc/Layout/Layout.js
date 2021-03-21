import React, { Component } from "react";
import classes from "./Layout.module.css";
import Auxilary from "../Auxilary/Auxilary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  //   sideDrawerClosedHandler = () => {
  //     this.setState({ showSideDrawer: false });
  //   };

  //   sideDrawerToggleHandler = () => {
  //     this.setState((prevState) => {
  //       return { showSideDrawer: !prevState.showSideDrawer };
  //     });
  //   };

  render() {
    return (
      <Auxilary>
        <Toolbar isAuth={this.props.isAuthenticated} menuClicked={null} />
        {/* <SideDrawer
          isAuth={this.props.isAuthenticated}
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        /> */}
        <main className={classes.Content}>{this.props.children}</main>
      </Auxilary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
