import React from "react";

import { Container, Form, Button } from "react-bootstrap";

function UpdateUser({handleSubmit, handleUpdate, user}) {
  return (
    <Container>
      <h3>Update Info</h3>
      <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label><b>Username</b></Form.Label>
          <Form.Control 
            type="text"
            defaultValue={user.Username}
            onChange={e => handleUpdate(e)}
            placeholder="Enter a username"
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>Password</b></Form.Label>
          <Form.Control
            type="password"
            defaultValue=""
            onChange={e => handleUpdate(e)}
            minLength="8"
            placeholder="8 or more characters"
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>E-mail</b></Form.Label>
          <Form.Control 
            type="email"
            defaultValue={user.Email}
            onChange={e => handleUpdate(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" onClick={handleSubmit}>Update</Button>
      </Form>
    </Container>
  )
}

export default UpdateUser;
