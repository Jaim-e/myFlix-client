import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Container, Row, Col, CardGroup, Card, Form, Button } from "react-bootstrap";

//import "./login-view.scss";

export function LoginView(props) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(data), which provides the username to our parent component (child to parent communication) */
    axios.
    post(`https://secure-coast-98530.herokuapp.com/login`, {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log("no such user");
      alert("No valid username or password!")
    });
  };

  return (
  <Container>
    <Row className="justify-content-md-center">
      <Col xs={12} sm={10} md={8} lg={6}>
        <CardGroup>
          <Card>
            <Card.Title className="mb-3"><h3>Please Login</h3></Card.Title>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label><b>Username</b></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={e => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label><b>Password</b></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};
