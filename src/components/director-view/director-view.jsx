import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className="director-view mt-5">
        <Row>
          <h1>{director.Name}</h1>
        </Row>
        <br />
        <Row>
          <h4 className="director-bio">{director.Bio}</h4>
        </Row>
        <br />
        <Button variant="secondary" onClick={() => { onBackClick() }}>Back</Button>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    //Birthdate: PropTypes.string,
  }).isRequired,
};
