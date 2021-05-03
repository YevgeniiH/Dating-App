import React, { Component } from "react";
import { connect } from "react-redux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import Spinner from "../UI/Spinner/Spinner";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar isAuth={false} menuClicked={null} />
        <main className={classes.Content}>
          {this.props.isLoading ? <Spinner /> : this.props.children}
        </main>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.loading.active_loading > 0,
});

export default connect(mapStateToProps)(Layout);
