import React from "react";

import { Container, Form, Button } from "react-bootstrap";

function UpdateUser({handleSubmit, handleUpdate, user}) {
  return (
    <Container>
      <h3>Update Info?</h3>
      <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label><b>New username</b></Form.Label>
          <Form.Control 
            type="text"
            name= "Username"
            defaultValue={user.Username}
            onChange={e => handleUpdate(e)}
            placeholder="Enter a username"
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>New password</b></Form.Label>
          <Form.Control
            type="password"
            defaultValue=""
            name="Password" 
            onChange={e => handleUpdate(e)}
            minLength="8"
            placeholder="8 or more characters"
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>New e-mail</b></Form.Label>
          <Form.Control 
            type="email"
            name="Email"
            defaultValue={user.Email}
            onChange={e => handleUpdate(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </Form.Group>
        <br />
        <br />
        <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Update Info</Button>
      </Form>
    </Container>
  )
}

export default UpdateUser;
