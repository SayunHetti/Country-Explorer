// src/pages/LanguagesPage.js
import React, { useState, useMemo } from "react";
import { Card, Container, Row, Col, Spinner, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAllLanguages from "../hooks/useAllLanguages";

const LanguagesPage = () => {
  const { languages, loading } = useAllLanguages();
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize the filtered languages based on the search term
  const filteredLanguages = useMemo(() => {
    return languages.filter((language) =>
      language.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [languages, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Languages</h1>
      {/* Search Bar */}
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search for a language..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Form.Group>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {filteredLanguages.length > 0 ? (
          filteredLanguages.map((language) => (
            <Col key={language}>
              <Card
                as={Link}
                to={`/countries-by-language/${encodeURIComponent(language)}`}
                className="h-100 text-decoration-none"
              >
                <Card.Body className="text-center">
                  <Card.Title>{language}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>No languages found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default LanguagesPage;
