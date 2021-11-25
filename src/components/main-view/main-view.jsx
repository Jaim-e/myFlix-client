import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";

import { Row, Col, Button } from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();
    /* Initial state is set to null */
    this.state = {
      movies: [],
    //  selectedMovie: null,
      user: null,
    //  register: null
    };
  }

  /* Get movies from API */
  getMovies(token) {
    axios
      .get("https://secure-coast-98530.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  /* When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' *property to that movie 
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  } 
  */
  
  /*  When a user wants to have an account, this function allows the 'new user' to register on myFlix 
  onRegistration(register) {
    this.setState({
      register
    });
  }
  */

  /* When a user successfully logs in, this function updates the 'user' property in state to that *particular user */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  /* When a user wants to log out, this function is called when the button Logout is cliecked */
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user } = this.state;
   // console.log(register);
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView */
    if (!user) 
      return 
        <Row>
          <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
        </Row>
      //  console.log(user);
    
    /* If there is not registered user, the RegistrationView is rendered. If there is a user registered, the user details are *passed as a prop to the LoginView */
    //if (!register) return <RegistrationView onRegistration={register => this.onRegistration(register)} />;

    /* Before the movies have been loaded */
    if (movies.length === 0) 
      return <div className="main-view">Loading...</div>;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>  
            ))
          }} />

          {/* MOVIES */}
          <Route path="/movies/:movieId" render={({ match, history }) => {
            return (
              <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            )  
          }} />

          {/* DIRECTORS */}
          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0)
              return <div className="main-view" />;
            return (
              <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            )  
          }} />

          {/* GENRES */}
          <Route path="/genres/:name" render={({ match, history }) => {
            if (movies.length === 0)
              return <div className="main-view" />;
            return (
              <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            )  
          }} />
          

          <Col>
            <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Col>

        </Row>
      </Router>
    );
  }
}
