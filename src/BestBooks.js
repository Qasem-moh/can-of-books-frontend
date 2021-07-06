import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listBook: [],
    };
  }
  componentDidMount = () => {
    let SERVER_URL = process.env.REACT_APP_SERVER_URL;
    let url = `${SERVER_URL}/books?email=${this.props.auth0.user.email}`;
    axios.get(url).then((response) => {
      this.setState({
        listBook: response.data,
      });
    });
  };

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        {this.state.listBook.map((item) => {
          return (
            <>
              <p>{item.nameBook}</p>
              <p>{item.bookDescription}</p>
              <img src={item.bookImg} alt={item.nameBook} />
            </>
          );
        })}
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
