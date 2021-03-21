import React from "react";
import "./index.css";
import "./App.css";
import axios from "axios";
import Layout from "./components/Layout/Layout";


class App extends React.Component {
  state = {
    items: [],
    error: null,
    isLoaded: false,
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get("/users")
      .then((result) => {
        this.setState({
          isLoaded: true,
          items: result.data,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error: error,
        });
      });
  };

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Layout>
          <ul>
            {this.state.items.map((item) => (
              <li key={item.userName}>{item.userName}</li>
            ))}
          </ul>
        </Layout>
      );
    }
  }
}

export default App;
