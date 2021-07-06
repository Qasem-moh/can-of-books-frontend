import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { Card } from "react-bootstrap";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listBook: [],
    };
  }
  componentDidMount = async () => {
    let SERVER_URL = process.env.REACT_APP_SERVER_URL;
    
    
    
    let url = `${SERVER_URL}/books?email=${this.props.auth0.user.email}`;
    const axiosData = await axios.get(url);

    console.log(axiosData);
    this.setState({
      listBook: axiosData.data.books,
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
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.bookImg}/>
                <Card.Body>
                  <Card.Title>{item.nameBook}</Card.Title>
                  <Card.Text>{item.bookDescription}</Card.Text>
                </Card.Body>
              </Card>
              <br />
            </>
          );
        })}
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
