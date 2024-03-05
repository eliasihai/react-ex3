import React from "react";
import { Link } from "react-router-dom";
import styles from "../NavBar.module.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      <Container className={styles.navbarContainer}>
        <Navbar.Brand as={NavLink} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={NavLink} to="/" className={styles.navLink}>
              Home
            </Nav.Link> */}
            <Nav.Link as={NavLink} to="/login" className={styles.navLink}>
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register" className={styles.navLink}>
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <div className="navBar">
    //   <div className="stocks">
    //     <Link to="/" activeClassName="active">Home</Link>
    //   </div>
    //   <div className="login">
    //     <Link to="/login" activeClassName="active">Login</Link>
    //   </div>
    //   <div className="register">
    //     <Link to="/register" activeClassName="active">Register</Link>
    //   </div>
    // </div>
  );
};

export default NavBar;
