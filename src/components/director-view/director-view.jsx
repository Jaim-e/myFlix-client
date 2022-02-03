import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    const { director} = this.props;

    return (
      <Container className="director-view mt-5">
        <Row>
          <h1>{director.Name}</h1>
          <p className="director-bio">{director.Bio}</p>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Back</Button>
          </Link>
        </Row>
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
