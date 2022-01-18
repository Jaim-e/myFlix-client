import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { Row, Col, Button } from "react-bootstrap";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view mt-5">
        <Col xs={12} md={6} className="movie-poster">
          <img src={movie.ImagePath} className="w-75" />
        </Col>

        <Col xs={12} md={6} className="movie-body">
          <div className="movie-title">
            <span className="label"><b>Title: </b></span>
            <span className="value">{movie.Title}</span>
          </div>

          <div className="movie-description">
            <span className="label"><b>Description: </b></span>
            <span className="value">{movie.Description}</span>
          </div>

          <div className="movie-genre">
            <span className="label"><b>Genre: </b></span>
            {/*<span className="value">{movie.Genre}</span>*/}
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
          </div>

          <div className="movie-director">
            <span className="label"><b>Director: </b></span>
            {/*<span className="value">{movie.Director}</span>*/}
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>
          </div>

          <Button variant="dark" onClick={() => { onBackClick() }}>Back</Button>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthday: PropTypes.string
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};