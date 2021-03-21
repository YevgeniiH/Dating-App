import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../../store/actions/index";

class Logout extends PureComponent {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to='/' />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
