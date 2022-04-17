import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

// #0:
import { setMovies } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";
/* #1:
  The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/

/*import { MovieCard } from "../movie-card/movie-card";*/
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";

import { Container, Navbar, Nav, Row, Col, Button } from "react-bootstrap";

// #2: export keyword removed from here
export class MainView extends React.Component {

  constructor() {
    super();
    // [Initial state is set to null]
    // #3: movies state removed from here:
    this.state = {
    //  movies: [],
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    console.log(">Testing console<", accessToken)
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      }, () => console.log("updated state", this.state));
      this.getMovies(accessToken);
      console.log(">Testing console 1<");
    }
  }

  /* Get movies from API */
  getMovies(token) {
    axios
      .get(`https://secure-coast-98530.herokuapp.com/movies`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      })
      .then(response => {
        /*
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        */
       // #4:
       this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the 'user' property in state to that particular user */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  /* When a user wants to log out, this function is called when the button Logout is clicked */
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  }

  render() {
    //const { movies, user } = this.state;
    // #5: movies is now extrated from this.props rather than from this.state
    let { movies } = this.props;
    let { user } = this.state;

    /* If there is not registered user, the RegistrationView is rendered. If there is a user registered, the user details are passed as a prop to the LoginView */
    //if (!register) return <RegistrationView onRegistration={register => this.onRegistration(register)} />;

    /* Before the movies have been loaded */
    return (
      <Router>
        <Navbar bg="dark" variant="dark" expand="sm">
          <Container fluid>
            <Navbar.Brand href="/"><h1>MyFlix</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            {user && (
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Nav.Link as={Link} to={`/users/${user}`} target='_self'>Profile</Nav.Link>
                </Nav>
                <Col>
                  <Button variant="secondary" onClick={() => { this.onLoggedOut() }}>Logout</Button>
                </Col>
              </Navbar.Collapse>
            )}
            {!user && (
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Nav.Link as={Link} to={`/register`} target='_self'>Registration</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            )}
          </Container>
        </Navbar>

        <Row className="main-view justify-content-md-center">
          {/* LOGIN or MAIN */}
          <Route exact path="/" render={() => {
            /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView */
            if (!user) 
              return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              )
            if (movies.length === 0)
              return <div className="main-view">Loading...</div>;
            /*
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            */
            // #6:
            return <MoviesList movies={movies} />
          }} />

          {/* REGISTRATION */}
          <Route path="/register" render={() => {
            if (user) 
              return <Redirect to="/" />;
            return (
              <Col>
                <RegistrationView />
              </Col>
            )
          }} />

          {/* PROFILE */}
          <Route path="/users/:username" render={({ history }) => {
            console.log(">Testing console<", user)
            if (!user)
              return <Redirect to="/" />
              console.log(">Testing console 1<");
            return (
              <Col>
                <ProfileView movies={movies} />
              </Col>
            )
          }} />


          {/* MOVIES */}
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) 
              return ( 
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              )
            if (movies.length === 0)
              return <div className="main-view" />;
            return (
              <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            )  
          }} />

          {/* GENRES */}
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) 
              return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              )
            if (movies.length === 0)
              return <div className="main-view" />;
            return (
              <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            )  
          }} />

          {/* DIRECTORS */}
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) 
              return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              )
            if (movies.length === 0)
              return <div className="main-view" />;
            return (
              <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            )  
          }} />
        </Row>
      </Router>
    );
  }
}

// #7:
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #8:
export default connect(mapStateToProps, { setMovies })(MainView);
