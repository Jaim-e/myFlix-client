import React from "react";

import { Container, Button } from "react-bootstrap";


function UserInfo({ name, email }) {
  return (
    <Container>
      <h3>User Info</h3>
      <br />
      <p><b>Username: </b>{name}</p>
      <p><b>E-mail: </b>{email}</p>
      <br />

      <Button variant="outline-danger" onClick={() => handleDeleteUser()}>Delete Account</Button>

    </Container>
  )
}

export default UserInfo;
