import React from "react";
import { Form } from "react-bootstrap";

function UpdateUser(handleSubmit, handleUpdate, user) {
  return (
    <>
      <h4>Update info</h4>
      <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text"
            defaultValue={user.Username}
            onChange={e => handleUpdate(e)}
            placeholder="Enter a username"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password"
            defaultValue=""
            onChange={e => handleUpdate(e)}
            minLength="8"
            placeholder="Your password must be 8 or more characters"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email"
            defaultValue={user.Email}
            onChange={e => handleUpdate(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>Update</Button>
      </Form>
    </>
  )
}

export default UpdateUser;
