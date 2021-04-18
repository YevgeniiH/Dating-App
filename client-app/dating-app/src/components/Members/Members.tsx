import { Member } from "../../Interfaces/Member";
import React, { Component } from "react";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import { MemberService } from "../../services/MembersService";
import { CardDeck, Spinner } from "react-bootstrap";
import MemberCard from "./MemberCard/MemberCard";
import classes from "./Members.module.css";

class Members extends Component {
  state = {
    loaded: false,
  };
  members: Member[] = [];
  memberService = new MemberService();

  componentDidMount() {
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
        <CardDeck>
          {this.state.loaded ? (
            list
          ) : (
            <Spinner
              animation='border'
              variant='primary'
              style={{ marginLeft: "20px" }}
            />
          )}
        </CardDeck>
      </div>
    );
  }
}

export default withErrorHandler(Members, axios);
