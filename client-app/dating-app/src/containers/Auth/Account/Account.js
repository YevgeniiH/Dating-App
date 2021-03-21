import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import classes from "./Account.module.css";
import { useHistory } from "react-router";

function Account(props) {
  const history = useHistory();

  function logoutHandler() {
    history.push("/logout");
  }

  return (
    <div className={classes.Account}>
      <DropdownButton
        title={"Welcome " + props.username}
        menuAlign='right'
        id='account_dropdown'
        variant='flat'>
        <Dropdown.Item>Edit profile</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default Account;
