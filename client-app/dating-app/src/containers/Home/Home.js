import React from "react";
import Button from "react-bootstrap/Button";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.Home}>
      <h1>Find your match</h1>
      <p>Come on in to view your matches... all you need to sign up!</p>
      <div>
        <Button variant='primary'>Register</Button>
        <Button variant='info'>Learn more</Button>
      </div>
    </div>
  );
};

export default Home;
