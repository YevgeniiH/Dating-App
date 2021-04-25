import React, { Component } from "react";
import { MemberService } from "../../../services/MembersService";
import { withRouter } from "react-router";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import classes from "./MemberDetail.module.css";
import MemberInfo from "./MemberInfo";

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
    const member = this.state.member;
    return (
      <div>
        {member === null ? null : (
          <div className={classes.MemberDetail}>
            <div className='col-4'>
              <Card className={classes.Card}>
                <Card.Img
                  variant='top'
                  className={classes.imgThumbnail}
                  src={member.photoUrl || "../../../assets/user.png"}
                  alt={member.knownAs}
                />
                <Card.Body className={classes.CardBody}>
                  <Card.Text>
                    <strong>Location:</strong>
                    <p>
                      {member.city}, {member.country}
                    </p>
                  </Card.Text>
                  <Card.Text>
                    <strong>Age:</strong>
                    <p>{member.age}</p>
                  </Card.Text>
                  <Card.Text>
                    <strong>Created:</strong>
                    <p>{member.lastActive}</p>
                  </Card.Text>
                  <Card.Text>
                    <strong>Member since:</strong>
                    <p>{member.created}</p>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className={classes.CardFooter}>
                  <ButtonGroup className={classes.BtnGroup}>
                    <Button>Like</Button>
                    <Button variant='warning'>Message</Button>
                  </ButtonGroup>
                </Card.Footer>
              </Card>
            </div>
            <div className='col-8'>
              <MemberInfo member={member} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(withErrorHandler(MemberDetail, axios));
