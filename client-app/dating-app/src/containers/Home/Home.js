import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import classes from "./Home.module.css";

const Home = () => {
  const history = useHistory();

  function registerHandler() {
    history.push("/register");
  }

  return (
    <div className={classes.Home}>
      <h1>Find your match</h1>
      <p>Come on in to view your matches... all you need to sign up!</p>
      <div>
        <Button variant='primary' onClick={registerHandler}>
          Register
        </Button>
        <Button variant='info'>Learn more</Button>
      </div>
    </div>
  );
};

export default Home;
