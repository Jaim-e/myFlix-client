import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Link } from "react-router-dom";

import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";

import { Container, Row, Col, Card, Button } from "react-bootstrap";


export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: [],
    };
  }

  favoriteMovieList = movies.filter((movies) => {
    return user.FavoriteMovies.includes(movies._id);
  });

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get("https://secure-coast-98530.herokuapp.com/users/${username}", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favorites: response.data.Favorites,
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
    axios.post("https://secure-coast-98530.herokuapp.com/login", {
      Username: username,
      Password: password
    })
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
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put("https://secure-coast-98530.herokuapp.com/users/${username}", {
        username: this.state.Username,
        password: this.state.Password,
        email: this.state.Email,
        birthday: this.state.Birthday
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
        });
        localStorage.setItem("user", response.data.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Profile updated");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  removeFavorite() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
    .delete("https://secure-coast-98530.herokuapp.com/users/${username}/movies/${movie._id}", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log(response);
      alert("Movie removed!");
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  deleteUser() {
    const answer = windows.confirm("Delete your account?");
    if (answer) {
      const username = localStorage.getItem("user");
      const token = localStorage.getItem("token");
  
      axios
      .delete("https://secure-coast-98530.herokuapp.com/users/${username}", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log(response);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("Profile successfully deleted");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      })
    }
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

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {
    const { username, email, birthday, favorites } = this.props;
    console.log(this.props)

    /*
    useEffect(() => {
      let isMounted = true;
      isMounted && getUser();
      return () => {
        isMounted = false;
      }
    }, [])
    */

    return (
      <Container>
        <Row>

          <Col xs={12} sm={4}>
            <Card>
              <Card.Body>
                <UserInfo name={user.Username} email={user.Email} />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={8}>
            <Card>
              <Card.Body>
                <UpdateUser user={user} setUser={setUser} />
              </Card.Body>
            </Card>
          </Col>

        </Row>
        
        <FavoriteMovies favoriteMovieList={favoriteMovieList} />
      </Container>
    )
  }
}


  /*    <Container className="profile-view">
        <Row className="justify-content-md-center">
          <Col>
          
          </Col>
        </Row>
      </Container>
  */
