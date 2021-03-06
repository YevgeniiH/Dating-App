import React, { Component } from "react";
import { connect } from "react-redux";
import { checkValidity, updateObject } from "../../../shared/utility";
import { Form, FormControl, FormGroup, Button } from "react-bootstrap";
import * as actions from "../../../store/actions/index";
import classes from "./LoginForm.module.css";
import { Redirect } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class LoginForm extends Component {
  state = {
    controls: {
      email: {
        elementConfig: {
          type: "text",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          //isEmail: true,
        },
        isValid: false,
        touched: false,
      },
      password: {
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        isValid: false,
        touched: false,
      },
    },
  };

  componentDidMount() {
    if (this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        isValid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };

  loginHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      false
    );
  };

  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((el) => (
      <FormGroup key={el.id}>
        <FormControl
          type={el.config.elementConfig.type}
          placeholder={el.config.elementConfig.placeholder}
          value={el.config.value}
          onChange={(event) => this.inputChangedHandler(event, el.id)}
        />
      </FormGroup>
    ));

    return (
      <div className={classes.LoginForm}>
        {authRedirect}
        <Form onSubmit={this.loginHandler} autoComplete='off'>
          {form}
          <Button type='submit' variant='primary'>
            Login
          </Button>
        </Form>
        <ToastContainer
          position='bottom-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
