import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import UserInfo from "./user-info";
import FavoriteMoviesComponent from "./favorite-movies";
import UpdateUser from "./update-user";

import { Container, Row, Col, Card } from "react-bootstrap";


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
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(data), which provides the username to our parent component (child to parent communication) */
    axios.post(`https://secure-coast-98530.herokuapp.com/login`,
      {
        Username: username,
        Password: password
      }
    )
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log("no such user");
    });
  };

  handleUpdate(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

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
        alert("Profile updated");
        this.updateDetails(response.data);
        localStorage.setItem("user", this.state.Username);
        console.log(this.state.Username);
        console.log(this.state.Password);
        window.open(`/users/${username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
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

  removeFromFavorites(movie) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios
      .delete(
        `https://secure-coast-98530.herokuapp.com/users/${user}/removeFromFav/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(response => {
        console.log(response);
        alert("Movie removed!");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  refreshPage() {
    window.location.reload(true);
  };



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
              <FavoriteMoviesComponent favoriteMovieList={favoriteMovieList} />
            </Card>
          </Col>
        </Row>

        
      </Container>
    )
  }
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string
  }))
};
