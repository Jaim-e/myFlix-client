import React from "react";

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
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>

          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>

          <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre}</span>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
          </div>

          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director}</span>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>
          </div>

          <Button onClick={() => { onBackClick() }}>Back</Button>
        </Col>
      </Row>
    );
  }
}
