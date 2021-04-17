import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import classes from "./MemberCard.module.css";
import {
  BsFillEnvelopeFill,
  BsPeopleCircle,
  BsFillHeartFill,
} from "react-icons/bs";

class MemberCard extends Component {
  render() {
    const member = this.props.member;
    return (
      <div>
        <Card className={classes.Card}>
          <Card.Img variant='top' src={member.photoUrl} alt={member.knowsAs} />
          <Card.ImgOverlay>
            <ul className={[classes.List, classes.animate].join(" ")}>
              <li key='1'>
                <Button>
                  <BsPeopleCircle />
                </Button>
              </li>
              <li key='2'>
                <Button>
                  <BsFillHeartFill />
                </Button>
              </li>
              <li key='3'>
                <Button>
                  <BsFillEnvelopeFill />
                </Button>
              </li>
            </ul>
          </Card.ImgOverlay>
          <Card.Body>
            <Card.Title>{member.knowsAs}</Card.Title>
            <Card.Text>
              <small className='text-muted'>{member.city}</small>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default MemberCard;
