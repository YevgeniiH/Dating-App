import React, { Component } from "react";
import { Alert, Button, Card, Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import { MemberService } from "../../../services/MembersService";
import classes from "./MemberEdit.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Prompt, withRouter } from "react-router";

class MemberEdit extends Component {
  state = {
    member: null,
    isFormDirty: false,
  };
  memberService = new MemberService();

  componentDidMount() {
    this.loadMember();
  }

  loadMember() {
    this.memberService
      .getMember(this.props.userName)
      .then((r) => {
        this.setState({ member: r.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleChange = (e) => {
    if (e.target.value !== this.state.member[e.target.name]) {
      this.setState({ isFormDirty: true });
    }
    this.setState((prevState) => ({
      member: {
        ...prevState.member,
        [e.target.name]: e.target.value,
      },
    }));
  };

  updateMember = (e) => {
    e.preventDefault();
    this.memberService
      .updateMember(this.state.member)
      .then((r) => {
        toast.success("Profile updated successfully");
        this.setState({ isFormDirty: false });
      })
      .catch((e) => {
        toast.error("Failed to update profile");
        this.setState({ isFormDirty: true });
      });
  };

  render() {
    const member = this.state.member;
    return (
      <div>
        {member === null ? null : (
          <div className={classes.MemberEdit}>
            <ToastContainer
              position='bottom-right'
              autoClose={3000}
              hideProgressBar={true}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Prompt
              when={this.state.isFormDirty}
              message='Are you sure you want to continue? Any unsaved changes will be lost!'
            />
            <div className='col-4'>
              <h1>Your profile</h1>
            </div>
            <div className='col-8'>
              {this.state.isFormDirty ? (
                <Alert variant='primary'>
                  <strong>Information: </strong> You have made changes. Any
                  unsaved changes will be lost!
                </Alert>
              ) : null}
            </div>
            <div className='col-4'>
              <Card className={classes.Card}>
                <Card.Img
                  variant='top'
                  className={classes.imgThumbnail}
                  src={member.photoUrl || "../../../assets/user.png"}
                  alt={member.knownAs}
                />
                <Card.Body className={classes.CardBody}>
                  <div>
                    <strong>Location:</strong>
                    <p>
                      {member.city}, {member.country}
                    </p>
                  </div>
                  <div>
                    <strong>Age:</strong>
                    <p>{member.age}</p>
                  </div>
                  <div>
                    <strong>Created:</strong>
                    <p>{member.lastActive}</p>
                  </div>
                  <div>
                    <strong>Member since:</strong>
                    <p>{member.created}</p>
                  </div>
                </Card.Body>
                <Card.Footer className={classes.CardFooter}>
                  <Button
                    disabled={!this.state.isFormDirty}
                    className={classes.BtnGroup}
                    form='editForm'
                    type='submit'>
                    Save changes
                  </Button>
                </Card.Footer>
              </Card>
            </div>
            <div className='col-8'>
              <div>
                <Tabs defaultActiveKey='about' id='uncontrolled-tab-example'>
                  <Tab eventKey='about' title={"About " + member.knownAs}>
                    <form onSubmit={this.updateMember} id='editForm'>
                      <h4 className='mt-2'>Description</h4>
                      <textarea
                        className='form-control'
                        name='introduction'
                        onChange={this.handleChange}
                        rows='6'
                        value={member.introduction}
                      />
                      <h4 className='mt-2'>Looking for</h4>
                      <textarea
                        className='form-control'
                        name='lookingFor'
                        onChange={this.handleChange}
                        rows='6'
                        value={member.lookingFor}
                      />
                      <h4 className='mt-2'>Interests</h4>
                      <textarea
                        className='form-control'
                        name='interests'
                        onChange={this.handleChange}
                        rows='6'
                        value={member.interests}
                      />
                      <h4 className='mt-2'>Location Details:</h4>
                      <div className='form-inline'>
                        <label>City: </label>
                        <input
                          name='city'
                          onChange={this.handleChange}
                          type='text'
                          value={this.state.member.city}
                          className='form-control mx-2'
                        />
                        <label>Country: </label>
                        <input
                          name='country'
                          onChange={this.handleChange}
                          type='text'
                          value={this.state.member.country}
                          className='form-control mx-2'
                        />
                      </div>
                    </form>
                  </Tab>
                  <Tab eventKey='photo-edit' title='Edit Photos'>
                    <p>Photos</p>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.auth.userId,
  };
};

export default withRouter(connect(mapStateToProps)(MemberEdit));
