import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { Card,Row,Button } from "react-bootstrap";


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameBook:'',
      bookImg:'',
      bookDescription:'',
      formShow:false,
      listBook: [],
      showBoutton:true,
      showform2:false
    };
  }

  //  ====================== function for get 
  componentDidMount = async () => {
    let SERVER_URL = process.env.REACT_APP_SERVER_URL;
    
    
    
    let url = `${SERVER_URL}/books?email=${this.props.auth0.user.email}`;
    const axiosData = await axios.get(url);

    console.log(axiosData);
    this.setState({
      listBook: axiosData.data.books,
    });
  };

// http://localhost:8000/books/1?email=anofal719@gmail.com
  deleteBook=(ind)=>{
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/books/${ind}/?email=${this.props.auth0.user.email}`).then(res=>{
        this.setState({
          listBook:res.data
        })
      })
  }
  // ===============================================


  displayForm=()=>{
    this.setState({
      formShow:true,
      showBoutton:false
    })
  }
  getInputName=(e)=>{
    this.setState({
      nameBook:e.target.value,
    })
  }
  getInputImg=(e)=>{
    this.setState({
      bookImg:e.target.value,
    })
  }
  getInputDescrip=(e)=>{
    this.setState({
      bookDescription:e.target.value,
    })
  }
  createBook=(e)=>{
    e.preventDefault();
    const reqBody={
      nameBook: this.state.nameBook,
      bookImg: this.state.bookImg,
      bookDescription:this.state.bookDescription,
      email:this.props.auth0.user.email
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/books`,reqBody).then(res=>{
      this.setState({
        listBook:res.data,
        formShow:!this.state.formShow,
        showBoutton:!this.state.showBoutton
      })
    }
      
    ).catch(error=>{alert(error.message)})
  }
  // =======================================================
  updatBook=()=>{
    this.setState({
      showform2:!this.state.showform2
    })
  }
    editBook=(e,index)=>{
      e.preventDefault();
      const reqBody={
        nameBook: this.state.nameBook,
        bookImg: this.state.bookImg,
        bookDescription:this.state.bookDescription,
        email:this.props.auth0.user.email
      }
      axios.put(`${process.env.REACT_APP_SERVER_URL}/books/${index}`,reqBody).then(res=>{
        this.setState({
          listBook:res.data,
          showform2:!this.state.showform2
        })
      })}
  
  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
      {
        this.state.showBoutton&&
        <Button variant="dark" onClick={this.displayForm}>add new book</Button>
      }
        

        {
          this.state.formShow&&<form onSubmit={(e)=>{this.createBook(e)}}>
          <input type="text" onChange={(e)=>{this.getInputName(e)}} required placeholder='name of book'/><br/>

          <input type="text" onChange={(e)=>{this.getInputImg(e)}} required placeholder='img of book'/>
          <br/>

          <input type="text" onChange={(e)=>{this.getInputDescrip(e)}} required placeholder='des of book'/>
          <br/>
          
          <Button variant="dark" type="submit" >add new book</Button>
          
        </form>

        }
        
      <Row xs={1} md={3} >
        {this.state.listBook.map((item,index) => {
          return (
            <>
              <Card style={{ width: "100px" ,height: "100hv"} }>
                <Card.Img variant="top" src={item.bookImg} height="400px"/>
                    <Card.Body>
                    <Card.Title>{item.nameBook}</Card.Title>
                    <Card.Text>{item.bookDescription}</Card.Text>
                    <Button variant="dark" onClick={(e)=>{this.deleteBook(index)} }> delete</Button>
                    <Button variant="dark" onClick={(e)=>{this.updatBook()} } style={{margin:"10px"}}> edit
                    </Button>
                    {
                    this.state.showform2&&
                    <form onSubmit={(e)=>{this.editBook(e,index)}}>
                      <label for='namebook' >book name</label> <br/>
                      <input type="text" name='namebook' onChange={(e)=>{this.getInputName(e)}}  style={{margin:"10px"}}/>
                      <br/>
                      <label for='img' >book img url</label> <br/>
                      <input type="text"  name='img' onChange={(e)=>{this.getInputImg(e)}} style={{margin:"10px"}}/>
                      <br/>
                      <label for='description' >book description</label> <br/>
                      <input type="text" name='description' onChange={(e)=>{this.getInputDescrip(e)}} style={{margin:"10px"}}/>
                      <br/>
                      <Button type="submit" variant="dark">save changes</Button>
                    </form>
                  }

                </Card.Body>
              </Card>
              <br />
            </>
          );
        })}
        </Row>
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
