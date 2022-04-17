import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";

import UserInfo from "./user-info";
import FavoriteMoviesComponent from "./favorite-movies";
import UpdateUser from "./update-user";

import { Container, Row, Col, Card } from "react-bootstrap";

import { setUser } from "../../actions/actions";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
      FavoriteMovies: [],
    };
    this.updateDetails = this.updateDetails.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    

  }  

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  updateDetails(details) {
    this.setState({
      Username: details.Username,
      Password: "", // Always clear password field after updates
      Email: details.Email,
      //Birthdate: details.Birthdate.slice(0, 10),
      FavoriteMovies: details.FavoriteMovies
    });
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`https://secure-coast-98530.herokuapp.com/users/${username}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        console.log(">Testing console<", response);
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(data), which provides the username to our parent component (child to parent communication) */
    axios
      .put(`https://secure-coast-98530.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthdate: this.state.Birthdate
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        this.updateDetails(response.data);
        localStorage.setItem("user", this.state.Username);
        alert("Profile updated");
      })
      .catch(function (error) {
        console.log(error);
      });
    };

  handleUpdate(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthdate(value) {
    this.state.Birthdate = value;
  }

  removeFromFavorites(id) {
    console.log({this: this});
    let token = localStorage.getItem("token");
    let url = `https://secure-coast-98530.herokuapp.com/users/${localStorage.getItem("user")}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      console.log("hello", response);
      response && response.data && this.updateDetails(response.data);
      alert("Movie removed!");

    })
    .catch(function (error) {
      console.log(error);
    });
  }



  handleDeleteUser() {
    const answer = windows.confirm("Delete your account?");
    if (answer) {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("user");

      axios
      .delete(`https://secure-coast-98530.herokuapp.com/users/${username}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        console.log(response);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("Profile successfully deleted");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    const { Username, Email, FavoriteMovies} = this.state;
    console.log("FavMov", FavoriteMovies)
    const favoriteMovieList = this.props.movies.filter((movie) => {
      return FavoriteMovies.includes(movie._id);
    });

    return (
      <Container className="profile-view">

        <Row className="justify-content-md-center">
          <Col xs={12} sm={4}>
            <Card>
              <Card.Body>
                <UserInfo name={Username} email={Email} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={8}>
            <Card>
              <Card.Body>
                <UpdateUser user={this.state} handleSubmit={this.handleSubmit} handleUpdate={this.handleUpdate} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <br />
        
        <Row>
          <Col>
            <Card>
              <FavoriteMoviesComponent favoriteMovieList={favoriteMovieList} removeFromFavorites={this.removeFromFavorites}/>
            </Card>
          </Col>
        </Row>

      </Container>
    );
  }
}

let mapStateToProps = state => {
  return { newUser: state.newUser }
}

export default connect(mapStateToProps, { setUser })(ProfileView);

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string
  }))
};
