import { Member } from "../../Interfaces/Member";
import React, { Component } from "react";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import { MemberService } from "../../services/MembersService";
import { CardDeck, Spinner } from "react-bootstrap";
import MemberCard from "./MemberCard/MemberCard";

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
    this.memberService.getMembers().then((r) => {
      this.members = r.data;
      this.setState({ loaded: true });
    });
  }

  render() {
    const list = this.members.map((m) => <MemberCard member={m} />);

    return (
      <div>
        <CardDeck>
          {this.state.loaded ? (
            list
          ) : (
            <Spinner animation='border' variant='primary' />
          )}
        </CardDeck>
      </div>
    );
  }
}

export default withErrorHandler(Members, axios);
