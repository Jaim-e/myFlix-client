import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  render() {
    const { genre } = this.props;

    return (
      <Container className="genre-view mt-5">
        <Row>
          <h1>{genre.Name}</h1>
        </Row>
        <Row>
          <p className="genre-description">{genre.Description}</p>
        </Row>
        <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Back</Button>
        </Link>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
