import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Carousel from "react-gallery-carousel";

class MemberInfo extends Component {
  state = {
    photos: [],
  };
  componentDidMount() {
    this.setState({ photos: this.getImages() });
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.props.member.photos) {
      imageUrls.push({
        src: photo.url,
      });
    }
    return imageUrls;
  }

  render() {
    const member = this.props.member;

    return (
      <div>
        <Tabs defaultActiveKey='about' id='uncontrolled-tab-example'>
          <Tab eventKey='about' title={"About " + member.knownAs}>
            <h4>Description</h4>
            <p>{member.introduction}</p>
            <h4>Looking for</h4>
            <p>{member.lookingFor}</p>
          </Tab>
          <Tab eventKey='interests' title='Interests'>
            <h4>Interests</h4>
            <p>{member.interests}</p>
          </Tab>
          <Tab eventKey='photos' title='Photos'>
            <Carousel
              images={this.state.photos}
              canAutoPlay={false}
              objectFit='fill'
              style={{
                width: "500px",
                height: "500px",
                margin: "25px",
                background: "transparent",
              }}></Carousel>
          </Tab>
          <Tab eventKey='messages' title='Messages'>
            <p>Messages</p>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default MemberInfo;
