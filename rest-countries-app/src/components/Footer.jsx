// src/components/Footer.js
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <Container>
        <div className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Country Explorer App. All rights
            reserved.
          </p>
          <div className="mt-2">
            <Link to="/" className="text-white me-3">
              Terms of Service
            </Link>
            <Link to="/" className="text-white me-3">
              Privacy Policy
            </Link>
            <Link to="/" className="text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
