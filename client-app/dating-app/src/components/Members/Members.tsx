import { Member } from "../../Interfaces/Member";
import React, { Component } from "react";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import { MemberService } from "../../services/MembersService";
import { CardDeck } from "react-bootstrap";
import MemberCard from "./MemberCard/MemberCard";
import classes from "./Members.module.css";
import Spinner from "../UI/Spinner/Spinner";

class Members extends Component {
  state = {
    loaded: false,
  };
  members: Member[] = [];
  memberService = new MemberService();

  componentDidMount() {
    console.log("cdm loadMembers");
    this.loadMembers();
  }

  loadMembers() {
    this.memberService
      .getMembers()
      .then((r) => {
        if (r.data) this.members = r.data;
        this.setState({ loaded: true });
      })
      .catch((e) => {
        this.setState({ loaded: true });
        console.log(e);
      });
  }

  render() {
    const list = this.members.map((m) => <MemberCard key={m.id} member={m} />);

    return (
      <div className={classes.Members}>
        <CardDeck>{this.state.loaded ? list : <Spinner />}</CardDeck>
      </div>
    );
  }
}

export default withErrorHandler(Members, axios);
