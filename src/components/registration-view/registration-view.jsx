import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Container, Row, Col, CardGroup, Card, Form, Button } from "react-bootstrap";

//import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://secure-coast-98530.herokuapp.com/login", {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open("/", "_self"); // the second argument "_self" is necessary so that the page will open in the current tab.
    })
    .catch(e => {
      console.log("error registering the user")
    });
    //console.log(username, password, email, birthdate);
    //props.onRegistration(username);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <CardGroup>
            <Card>
              <Card.Title className="mb-3">Please Register</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    placeholder="Enter your username"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    minLength="8"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                >Submit
                </Button>
              </Form>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func,
};
