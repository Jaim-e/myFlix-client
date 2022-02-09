import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Row, Col, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  addToFavorites(movie) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios
      .post(
        `https://secure-coast-98530.herokuapp.com/users/${user}` +
          "/movies/" +
          this.props.movie._id,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        console.log(response);
        alert(this.props.movie.Title + " is added to Favorite Movies!");
      });
  }

 
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view mt-5">
        <Col xs={12} md={6} className="movie-poster">
          <img className="w-75" src={movie.ImagePath} crossOrigin="anonymous" />
        </Col>

        <Col xs={12} md={6} className="movie-body">
          <div className="movie-title">
            <h1>
              <span className="label"><b>Title: </b></span>
              <span className="value">{movie.Title}</span>
            </h1>
          </div>
          <br />

          <div className="movie-description">
            <h2>
              <span className="label"><b>Description: </b></span>
            </h2>
            <h4>
              <span className="value">{movie.Description}</span>
            </h4>
          </div>
          <br />

          <div className="movie-genre">
            <h2>
              <span className="label"><b>Genre: </b></span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
            </h2>
          </div>
          <br />

          <div className="movie-director">
            <h2>
              <span className="label"><b>Director: </b></span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">{movie.Director.Name}</Button>
              </Link>
            </h2>
          </div>

          <Button className="mx-0 mt-5" variant="secondary" onClick={() => { onBackClick() }}>Back</Button>

          <Button className="mx-5 mt-5" variant="outline-success" onClick={() => this.addToFavorites(movie)}>Add To Favorites</Button>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    Director: PropTypes.array.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};