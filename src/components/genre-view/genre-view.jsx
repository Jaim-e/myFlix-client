import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container className="genre-view mt-5">
        <Row>
          <h1 className="genre-name">{genre.Name}</h1>
        </Row>
        <br />
        <Row>
          <h4 className="genre-description">{genre.Description}</h4>
        </Row>
        <br />
        <Button variant="secondary" onClick={() => { onBackClick() }}>Back</Button>
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
