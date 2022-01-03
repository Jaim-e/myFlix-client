import React from "react";
import ReactDOM from "react-dom";

import { Link } from "react-router-dom";

import { Container, Navbar, Nav, NavItem } from "react-bootstrap";

import { MainView } from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle "./index.scss"
/*import "./index.scss"; */

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container fluid xs={12} md={8}>

        <Navbar bg="dark" variant="dark" expand="sm">
          <Container fluid>
            <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Link to={`/users/${user}`}>
                  <NavItem href="">Profile</NavItem>
                </Link>
                <Nav.Link href="#update">Update</Nav.Link>
                <Nav.Link href="#logout">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <br />

        <MainView />

      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
