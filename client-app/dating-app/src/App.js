import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./index.css";
import "./App.css";
import Layout from "./components/Layout/Layout";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Logout from "./containers/Auth/Account/Logout/Logout";
import Home from "./containers/Home/Home";
import MemberDetail from "./components/Members/MemberDetail/MemberDetail";
import MemberEdit from "./components/Members/MemberEdit/MemberEdit";

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/LoginForm/LoginForm");
});

const asyncRegister = asyncComponent(() => {
  return import("./containers/Auth/RegisterForm/RegisterForm");
});

const asyncLists = asyncComponent(() => {
  return import("./components/Lists/Lists");
});

const asyncMessages = asyncComponent(() => {
  return import("./components/Messages/Messages");
});

const asyncMembers = asyncComponent(() => {
  return import("./components/Members/Members");
});

class App extends React.Component {
  state = {
    items: [],
    error: null,
    isLoaded: false,
  };

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/register' component={asyncRegister} />
        <Route path='/' exact component={Home} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/auth' component={asyncAuth} />
          <Route path='/register' component={asyncRegister} />
          <Route path='/lists' component={asyncLists} />
          <Route path='/messages' component={asyncMessages} />
          <Route path='/members/:username' component={MemberDetail} />
          <Route path='/member/edit' component={MemberEdit} />
          <Route path='/members' component={asyncMembers} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={Home} />
          <Redirect to='/' />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
