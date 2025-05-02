// src/components/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  // Getting the current user and logout function from the AuthContext
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle the logout process and navigate to the home page
  const handleLogout = () => {
    logout(); // Log out the user
    navigate("/"); // Redirect to the home page
  };

  // Handle going back to the previous page in history
  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        {/* Navbar brand linking to the Dashboard */}
        <Navbar.Brand as={Link} to="/Dashboard">
          Country Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Links for various pages */}
            <Nav.Link
              as={Link}
              to="/Dashboard"
              style={{ opacity: 1, color: "#fff", fontWeight: "bold" }} // Increase opacity and contrast for the link
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/favorites"
              style={{ opacity: 1, color: "#fff", fontWeight: "bold" }} // Same as above
            >
              Favorites
            </Nav.Link>
            {/* Dropdown for exploring categories */}
            <NavDropdown
              title="Explore"
              id="explore-nav-dropdown"
              style={{ opacity: 1, color: "#fff", fontWeight: "bold" }} // Same as above
            >
              <NavDropdown.Item as={Link} to="/languages">
                Languages
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/currencies">
                Currencies
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/capitals">
                Capital
              </NavDropdown.Item>
            </NavDropdown>
            {/* Dropdown for user account settings */}
            <NavDropdown title="Account" id="account-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {/* Logout button */}
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Add a "Go Back" button to navigate to the previous page */}
          <Button
            onClick={handleGoBack}
            variant="outline-light"
            style={{ opacity: 1 }} // Make button fully visible
          >
            Go Back
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
