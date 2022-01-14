import React from "react";

import { Container } from "react-bootstrap";


function UserInfo({ name, email }) {
  return (
    <Container>
      <h3>Your Info</h3>
      <br />
      <p><b>Username: </b>{name}</p>
      <p><b>E-mail: </b>{email}</p>
    </Container>
  )
}

export default UserInfo;
