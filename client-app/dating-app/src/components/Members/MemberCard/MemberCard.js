import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import classes from "./MemberCard.module.css";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Member } from "../../../Interfaces/Member";
import {
  BsFillEnvelopeFill,
  BsPeopleCircle,
  BsFillHeartFill,
} from "react-icons/bs";

class MemberCard extends Component {
  state = {
    redirect: false,
  };

  memberDetailHandler = () => {
    this.setState({ redirect: true });
  };

  render() {
    const member = this.props.member;
    return (
      <div>
        {this.state.redirect ? (
          <Redirect to={"/members/" + this.props.member.username} />
        ) : null}
        <Card className={classes.Card}>
          <Card.Img variant='top' src={member.photoUrl} alt={member.knownAs} />
          <Card.ImgOverlay>
            <ul className={[classes.List, classes.animate].join(" ")}>
              <li>
                <Button onClick={this.memberDetailHandler}>
                  <BsPeopleCircle />
                </Button>
              </li>
              <li>
                <Button>
                  <BsFillHeartFill />
                </Button>
              </li>
              <li>
                <Button>
                  <BsFillEnvelopeFill />
                </Button>
              </li>
            </ul>
          </Card.ImgOverlay>
          <Card.Body>
            <Card.Title>{member.knownAs}</Card.Title>
            <Card.Text>
              <small className='text-muted'>{member.city}</small>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MemberCard.propTypes = {
  members: PropTypes.objectOf(Member),
};

export default MemberCard;
