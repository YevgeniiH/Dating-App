import React, { Component } from "react";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import { MemberService } from "../../services/MembersService";
import { CardDeck } from "react-bootstrap";
import MemberCard from "./MemberCard/MemberCard";
import classes from "./Members.module.css";
import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class Members extends Component {
  members = [];
  memberService = new MemberService();

  componentDidMount() {
    if (!this.props.members) {
      this.props.loadMembers();
    }
  }

  render() {
    let membersList = [];
    if (this.props.members) {
      membersList = this.props.members.map((m) => (
        <MemberCard key={m.id} member={m} />
      ));
    }

    return (
      <div className={classes.Members}>
        <CardDeck>{this.props.loading ? <Spinner /> : membersList}</CardDeck>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  members: state.members.members,
  loading: state.members.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadMembers: () => dispatch(actions.loadMembers()),
  };
};

export default withErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(Members),
  axios
);
