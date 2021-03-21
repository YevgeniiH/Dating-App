import React, { Component } from "react";
import { checkValidity, updateObject } from "../../../shared/utility";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import classes from "./LoginForm.module.css";

class LoginForm extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        isValid: false,
        touched: false,
      },
      password: {
        elementType: "input",
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

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((el) => (
      <Input
        key={el.id}
        label={null}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        invalid={!el.config.isValid}
        shouldValidate={el.config.validation}
        touched={el.config.touched}
        changed={(event) => this.inputChangedHandler(event, el.id)}
      />
    ));

    return (
      <form
        onSubmit={this.props.login}
        autoComplete='off'
        className={classes.LoginForm}>
        {form}
        <Button btnType='submit'>Login</Button>
      </form>
    );
  }
}

export default LoginForm;
