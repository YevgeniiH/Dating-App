import React, { Component } from "react";
import { MemberService } from "../../../services/MembersService";
import { withRouter } from "react-router";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";

class MemberDetail extends Component {
  state = {
    member: null,
  };
  memberService = new MemberService();

  componentDidMount() {
    this.loadMember();
  }

  loadMember = () => {
    this.memberService
      .getMember(this.props.match.params.username)
      .then((r) => {
        this.setState({ member: r.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <div>{this.state.member !== null ? this.state.member.knownAs : null}</div>
    );
  }
}

export default withRouter(withErrorHandler(MemberDetail, axios));
